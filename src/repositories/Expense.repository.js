import expense from "../models/Expense.js";
import BaseRepository from "./Base.repository.js";
import getExchangeRate from "../utils/exchangeRate.js";
class ExpenseRepository extends BaseRepository {
  constructor() {
    super(expense);
  }

  async create(object) {
    try {
      object = await super.create(object);

      if (object.isAutomaticallyCreated && !object.jobId) {
        object.jobId = object._id;
        await object.save();
        //aca iria el schedule
      }

      return object;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, object) {
    try {
      object = await super.updateById(id, object);

      //aca se borra el schedule

      if (object.isAutomaticallyCreated && object.jobId) {
        //aca se agrega el schedule
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const foundExpense = await this.getById(id);

      if (foundExpense.isAutomaticallyCreated && foundExpense.jobId) {
        //aca se elimina el schedule
        await super.updateByFilter(
          { jobId: foundExpense.jobId },
          { isAutomaticallyCreated: false, interval: null, jobName: null }
        );
      }

      super.deleteById(id);
    } catch (error) {
      throw error;
    }
  }

  async getByFilter(filter) {
    //✓
    try {
      const foundObject = await this.model.findOne(filter).populate({
        path: "category_id",
        populate: {
          path: "icon_id",
          model: "icons",
        },
      });

      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async getAll(query, sort = "createdAt", order = "desc") {
    //✓
    try {
      const response = await this.model
        .find(query)
        .sort([[sort, order]])
        .populate({
          path: "category_id",
          populate: {
            path: "icon_id",
            model: "icons",
          },
        });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getStatistics(user_id, year) {
    try {
      const result = await this.model.aggregate([
        {
          $match: {
            user_id: user_id,
            $and: [
              {
                createdAt: {
                  $gte: new Date(year ? +year : new Date().getFullYear(), 0, 1),
                },
              },
              {
                createdAt: {
                  $lt: new Date(
                    year ? +year + 1 : new Date().getFullYear() + 1,
                    0,
                    1
                  ),
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: {
              $sum: "$amount",
            },
            totalIncome: {
              $sum: {
                $cond: {
                  if: { $gt: ["$amount", 0] },
                  then: "$amount",
                  else: 0,
                },
              },
            },
            totalLoss: {
              $sum: {
                $cond: {
                  if: { $lt: ["$amount", 0] },
                  then: "$amount",
                  else: 0,
                },
              },
            },
          },
        },
        {
          $group: {
            _id: { year: "$_id.year" },
            total: { $sum: "$total" },
            totalIncome: { $sum: "$totalIncome" },
            totalLoss: { $sum: "$totalLoss" },
            months: {
              $push: {
                month: "$_id.month",
                total: "$total",
                totalIncome: "$totalIncome",
                totalLoss: "$totalLoss",
              },
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
          },
        },
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getStatisticsByCategory(user_id, year, month, type) {
    try {
      const result = await this.model.aggregate([
        {
          $match: {
            user_id: user_id,
            $and: [
              {
                createdAt: {
                  $gte: new Date(
                    year != null && year != undefined
                      ? +year
                      : new Date().getFullYear(),
                    month != null &&
                    month != undefined &&
                    year != null &&
                    year != undefined
                      ? +month
                      : 0,
                    1
                  ),
                },
              },
              {
                createdAt: {
                  $lte: new Date(
                    year != null && year != undefined
                      ? +year
                      : new Date().getFullYear(),
                    month != null && month != undefined ? +month + 1 : 11,
                    month != null &&
                    month != undefined &&
                    year != null &&
                    year != undefined
                      ? 0
                      : 31
                  ),
                },
              },
            ],
            amount: +type ? { $gt: 0 } : { $lte: 0 },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $group: {
            _id: "$category_id",
            total: {
              $sum: "$amount",
            },
            categoryInfo: {
              $first: "$category",
            },
          },
        },
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAmount(user_id, year, month, type) {
    //✓
    try {
      const amountCondition = +type ? { $gt: 0 } : { $lte: 0 };

      const match = {
        $match: {
          user_id: user_id,
          $and: [
            {
              createdAt: {
                $gte: new Date(
                  year != null && year != undefined
                    ? +year
                    : new Date().getFullYear(),
                  month != null && month != undefined
                    ? +month
                    : new Date().getMonth(),
                  1
                ),
              },
            },
            {
              createdAt: {
                $lt: new Date(
                  year != null && year != undefined
                    ? +year
                    : new Date().getFullYear(),
                  month != null && month != undefined
                    ? +month + 1
                    : new Date().getMonth() + 1,
                  1
                ),
              },
            },
          ],
        },
      };

      match.$match =
        type != undefined && type != null
          ? { ...match.$match, amount: amountCondition }
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

  async getBalance(user_id) {
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
