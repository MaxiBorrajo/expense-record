import ExpenseRepository from "../repositories/Expense.repository.js";
import BaseService from "./Base.service.js";
import UserService from "./User.service.js";
import SavingGoalService from "./SavingGoal.service.js";
import { errors } from "../utils/errorDictionary.js";
import { sendPushNotification } from "../utils/sendNotification.js";
import NotificationService from "../services/Notification.service.js";
class ExpenseService extends BaseService {
  constructor() {
    super(ExpenseRepository);
  }

  isASaving(object) {
    return (
      object &&
      object.category_id &&
      object.category_id.toString() === "65cf719ad7d2035b7f1ca18f"
    );
  }

  async deleteByFilter(filter, token) {
    try {
      const deletedObject = await super.deleteByFilter(filter);

      await SavingGoalService.recalculateSavingGoal(filter.user_id, token);

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }

  async getMonthExpenses(month, user_id) {
    const monthExpenses = await this.repository.getMonthExpenses(
      month ? month : new Date().getMonth(),
      user_id
    );

    return monthExpenses;
  }

  async updateByFilter(filter, object, token) {
    try {
      const foundObject = await this.getById(filter._id);

      if (
        this.isASaving(foundObject) &&
        object &&
        !object.category_id &&
        object.amount >= 0
      ) {
        throw new errors.SAVINGS_MUST_BE_LESS_THAN_ZERO();
      }

      const updatedObject = await super.updateByFilter(filter, object);

      await this.recalculateBudgetSpent(filter.user_id, token);

      if (
        this.isASaving(foundObject) ||
        object.category_id === "65cf719ad7d2035b7f1ca18f"
      ) {
        await SavingGoalService.recalculateSavingGoal(filter.user_id, token);
      }

      return updatedObject;
    } catch (error) {
      throw error;
    }
  }

  async create(object, token) {
    try {
      if (this.isASaving(object) && object.amount >= 0) {
        throw new errors.SAVINGS_MUST_BE_LESS_THAN_ZERO();
      }

      const createdObject = await super.create(object);

      if (this.isASaving(object)) {
        await SavingGoalService.checkSavingGoal(createdObject, token);
      }

      await this.checkBudget(object, token);

      return createdObject;
    } catch (error) {
      throw error;
    }
  }

  async recalculateBudgetSpent(user_id, token) {
    const currentUser = await UserService.getById(user_id);
    const monthExpenses = await this.repository.getMonthExpenses(
      new Date().getMonth(),
      user_id
    );
    const percentageOfBudget =
      ((monthExpenses * -1) / currentUser.budget) * 100;

    if (
      currentUser.budget &&
      monthExpenses > currentUser.budget &&
      !currentUser.blockNotifications
    ) {
      const notification = await NotificationService.create({
        title: "¡You have exceeded your monthly budget!😱",
        body: `You have exceeded your monthly budget by $${+(
          monthExpenses * -1 -
          currentUser.budget
        ).toFixed(2)}`,
      });
      console.log(notification);
      await sendPushNotification(token, notification);
    }

    if (
      currentUser.budget &&
      monthExpenses <= currentUser.budget &&
      percentageOfBudget >= currentUser.budgetWarning &&
      !currentUser.blockNotifications
    ) {
      const notification = await NotificationService.create({
        title: "😰¡You are about to go over your monthly budget!",
        body: `You have reached ${+percentageOfBudget.toFixed(
          2
        )}% of your monthly budget`,
      });
      console.log(notification);
      await sendPushNotification(token, notification);
    }
  }

  async checkBudget(object, token) {
    const currentUser = await UserService.getById(object.user_id);
    const monthExpenses = await this.repository.getMonthExpenses(
      new Date().getMonth(),
      object.user_id
    );
    const percentageOfBudget =
      ((monthExpenses * -1) / currentUser.budget) * 100;

    if (
      (await this.budgetOverpassed(currentUser, object.amount)) &&
      !currentUser.blockNotifications
    ) {
      const notification = await NotificationService.create({
        title: "¡You have exceeded your monthly budget!😱",
        body: `You have exceeded your monthly budget by $${+(
          monthExpenses * -1 -
          currentUser.budget
        ).toFixed(2)}`,
      });
      console.log(notification);
      await sendPushNotification(token, notification);
    }

    if (
      !(await this.budgetOverpassed(currentUser, object.amount)) &&
      (await this.budgetAlmostPassed(currentUser, object.amount)) &&
      !currentUser.blockNotifications
    ) {
      const notification = await NotificationService.create({
        title: "😰¡You are about to go over your monthly budget!",
        body: `You have reached ${+percentageOfBudget.toFixed(
          2
        )}% of your monthly budget`,
      });
      console.log(notification);
      await sendPushNotification(token, notification);
    }
  }

  async budgetAlmostPassed(user, amount) {
    const monthExpenses = await this.repository.getMonthExpenses(
      new Date().getMonth(),
      user._id
    );

    const percentageOfBudget = ((monthExpenses * -1) / user.budget) * 100;
    console.log(user);
    console.log(user.budget);
    console.log(amount < 0);
    console.log(percentageOfBudget >= user.budgetWarning);
    return (
      user &&
      user.budget &&
      amount < 0 &&
      percentageOfBudget >= user.budgetWarning
    );
  }

  async budgetOverpassed(user, amount) {
    const monthExpenses = await this.repository.getMonthExpenses(
      new Date().getMonth(),
      user._id
    );

    console.log(user);
    console.log(user.budget);
    console.log(amount < 0);
    console.log(monthExpenses * -1 > user.budget);

    return (
      user && user.budget && amount < 0 && monthExpenses * -1 > user.budget
    );
  }

  async getAll(user_id, params) {
    try {
      let query = {
        user_id: user_id,
      };

      query = this.applyFilters(query, params);

      const result = await this.repository.getAll(
        query,
        params.sort,
        params.order
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  applyFilters(query, params) {
    if (params && params.year && !params.month && !params.day) {
      query = {
        ...query,
        $and: [
          { createdAt: { $gte: new Date(+params.year, 1, 1) } },
          { createdAt: { $lte: new Date(+params.year + 1, 0, 0) } },
        ],
      };
    }

    if (params && params.year && params.month && !params.day) {
      query = {
        ...query,
        $and: [
          { createdAt: { $gte: new Date(+params.year, +params.month, 1) } },
          { createdAt: { $lte: new Date(+params.year, +params.month + 1, 1) } },
        ],
      };
    }

    if (params && params.year && params.month && params.day) {
      query = {
        ...query,
        $and: [
          {
            createdAt: {
              $gte: new Date(+params.year, +params.month, +params.day, 0, 0, 0),
            },
          },
          {
            createdAt: {
              $lte: new Date(
                +params.year,
                +params.month,
                +params.day + 1,
                0,
                0,
                0
              ),
            },
          },
        ],
      };
    }

    if (params && params.keyword) {
      query = {
        ...query,
        title: { $regex: params.keyword, $options: "i" },
      };
    }

    if (params && params.category) {
      query = {
        ...query,
        category_id: params.category,
      };
    }

    if (params && params.type) {
      query = {
        ...query,
        amount: +params.type
          ? {
              $gt: 0,
            }
          : {
              $lte: 0,
            },
      };
    }

    return query;
  }

  async getStatistics(user_id, year) {
    try {
      return await this.repository.getStatistics(user_id, +year);
    } catch (error) {
      throw error;
    }
  }

  async getStatisticsByCategory(user_id, year, month, type) {
    try {
      return await this.repository.getStatisticsByCategory(
        user_id,
        year,
        month,
        type
      );
    } catch (error) {
      throw error;
    }
  }

  async applyConversion(user_id, oldCurrency, newCurrency) {
    try {
      return await this.repository.applyConversion(
        user_id,
        oldCurrency,
        newCurrency
      );
    } catch (error) {
      throw error;
    }
  }

  async getAmount(user_id, params) {
    try {
      return await this.repository.getAmount(
        user_id,
        params.year,
        params.month,
        params.type
      );
    } catch (error) {
      throw error;
    }
  }

  async getBalance(user_id) {
    try {
      return await this.repository.getBalance(user_id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ExpenseService();
