import expense from "../models/Expense.js";
import BaseRepository from "./Base.repository.js";
import getExchangeRate from "../utils/exchangeRate.js";

class ExpenseRepository extends BaseRepository {
  constructor() {
    super(expense);
  }

  async getByFilter(filter) {
    try {
      const foundObject = await this.model
        .findOne(filter)
        .populate("category_id", "category_name");

      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async getAll(query, sort = "createdAt", order = "desc") {
    try {
      const response = await this.model
        .find(query)
        .sort([[sort, order]])
        .populate("category_id", "category_name");

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getStatistics(user_id, year, month) {
    try {
      return {
        totalAmount:
          (await this.totalIncomeOrLoss(user_id, null, null, 1)) +
          (await this.totalIncomeOrLoss(user_id, null, null, 0)),

        totalAverageIncome: await this.totalAverageIncomeOrLoss(
          user_id,
          null,
          null,
          1
        ),
        totalAverageLoss: await this.totalAverageIncomeOrLoss(
          user_id,
          null,
          null,
          0
        ),
        totalAmountOfYear:
          (await this.totalIncomeOrLoss(user_id, year, null, 1)) +
          (await this.totalIncomeOrLoss(user_id, year, null, 0)),
        totalAverageAmountPerYear: await this.averageTotalAmountBy(
          user_id,
          "year"
        ),
        totalIncomeOfYear: await this.totalIncomeOrLoss(user_id, year, null, 1),
        totalLossOfYear: await this.totalIncomeOrLoss(user_id, year, null, 0),
        averageIncomeOfYear: await this.totalAverageIncomeOrLoss(
          user_id,
          year,
          null,
          1
        ),
        averageLossOfYear: await this.totalAverageIncomeOrLoss(
          user_id,
          year,
          null,
          0
        ),
        profitPercentageOfYear: await this.profitPercentage(
          user_id,
          year,
          null
        ),
        totalAmountOfMonth:
          (await this.totalIncomeOrLoss(user_id, year, month, 1)) +
          (await this.totalIncomeOrLoss(user_id, year, month, 0)),
        totalAverageAmountPerMonth: await this.averageTotalAmountBy(
          user_id,
          "month"
        ),
        totalIncomeOfMonth: await this.totalIncomeOrLoss(
          user_id,
          year,
          month,
          1
        ),
        totalLossOfMonth: await this.totalIncomeOrLoss(user_id, year, month, 0),
        averageIncomeOfMonth: await this.totalAverageIncomeOrLoss(
          user_id,
          year,
          month,
          1
        ),
        averageLossOfMonth: await this.totalAverageIncomeOrLoss(
          user_id,
          year,
          month,
          0
        ),
        profitPercentageOfMonth: await this.profitPercentage(
          user_id,
          year,
          month
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  async getCurrentAmount(user_id) {
    try {
      const result = await this.model.aggregate([
        {
          $match: {
            user_id: user_id,
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      return result[0]?.totalAmount || 0;
    } catch (error) {
      throw error;
    }
  }

  async averageTotalAmountBy(user_id, filter) {
    const groupBy = this.selectGroupBy(filter);

    try {
      const result = await this.model.aggregate([
        {
          $match: {
            user_id: user_id,
          },
        },
        {
          $group: {
            _id: groupBy,
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $group: {
            _id: null,
            averageTotalAmount: { $avg: "$totalAmount" },
          },
        },
      ]);

      return result[0]?.averageTotalAmount || 0;
    } catch (error) {
      throw error;
    }
  }

  selectGroupBy(filter) {
    if (filter === "year") {
      return { $year: "$createdAt" };
    }

    if (filter === "month") {
      return { $month: "$createdAt" };
    }

    return null;
  }

  async totalIncomeOrLoss(user_id, year, month, income) {
    try {
      const amountCondition = income ? { $gt: 0 } : { $lt: 0 };

      const dateCondition = {
        $gte: new Date(
          year ? year : new Date().getFullYear(),
          month ? month : 0,
          1
        ),
        $lte: new Date(
          year ? year : new Date().getFullYear() + 1,
          month ? month + 1 : 1,
          0
        ),
      };

      const match = {
        $match: {
          user_id: user_id,
          amount: amountCondition,
        },
      };

      match.$match =
        year || month
          ? { ...match.$match, createdAt: dateCondition }
          : match.$match;

      const result = await this.model.aggregate([
        match,
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

      return result[0]?.total || 0;
    } catch (error) {
      throw error;
    }
  }

  async profitPercentage(user_id, year, month) {
    try {
      const currentAmount = await this.totalIncomeOrLoss(
        user_id,
        year,
        month,
        1
      );
      const previousAmount = month
        ? await this.totalIncomeOrLoss(user_id, year, month - 1, 1)
        : await this.totalIncomeOrLoss(user_id, year - 1, month, 1);

      const percentage = previousAmount
        ? ((currentAmount - previousAmount) / currentAmount) * 100
        : 0;

      return percentage;
    } catch (error) {
      throw error;
    }
  }

  async totalAverageIncomeOrLoss(user_id, year, month, income) {
    try {
      const amountCondition = income ? { $gt: 0 } : { $lt: 0 };

      const dateCondition = {
        $gte: new Date(
          year ? year : new Date().getFullYear(),
          month ? month : 0,
          1
        ),
        $lte: new Date(
          year ? year : new Date().getFullYear() + 1,
          month ? month + 1 : 1,
          0
        ),
      };

      const match = {
        $match: {
          user_id: user_id,
          amount: amountCondition,
        },
      };

      match.$match =
        year || month
          ? { ...match.$match, createdAt: dateCondition }
          : match.$match;

      const result = await this.model.aggregate([
        match,
        {
          $group: {
            _id: null,
            averageExpense: { $avg: "$amount" },
          },
        },
      ]);

      return result[0]?.averageExpense || 0;
    } catch (error) {
      throw error;
    }
  }

  async applyConversion(user_id, oldCurrency, newCurrency) {
    try {
      const exchangeRate = await getExchangeRate(oldCurrency, newCurrency);

      return await this.model.updateMany(
        { user_id: user_id },
        { $mul: { amount: exchangeRate } }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default new ExpenseRepository();
