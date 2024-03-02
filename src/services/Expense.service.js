import ExpenseRepository from "../repositories/Expense.repository.js";
import BaseService from "./Base.service.js";

class ExpenseService extends BaseService {
  constructor() {
    super(ExpenseRepository);
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

  async getProfitPercentage(user_id) {
    try {
      return await this.repository.profitPercentage(user_id);
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
