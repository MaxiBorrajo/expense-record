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

  firstDateOfMonth(year, month) {
    const startDate = new Date();
    return new Date(
      +year != null || +year != undefined ? +year : startDate.getFullYear(),
      +month != null || +month != undefined ? +month : startDate.getMonth(),
      1
    );
  }

  finalDateOfMonth(year, month) {
    const endDate = new Date();
    return new Date(
      +year != null || +year != undefined ? +year : endDate.getFullYear(),
      +month != null || +month != undefined
        ? +month + 1
        : endDate.getMonth() + 1,
      0
    );
  }

  applyFilters(query, params) {
    if (params.year && params.month) {
      query = {
        ...query,
        createdAt: {
          $gte: this.firstDateOfMonth(params.year, params.month),
          $lte: this.finalDateOfMonth(params.year, params.month),
        },
      };
    }

    if (params.keyword) {
      query = {
        ...query,
        title: { $regex: params.keyword, $options: "i" },
      };
    }

    return query;
  }

  async getStatistics(user_id, year, month) {
    try {
      return await this.repository.getStatistics(user_id, +year, +month);
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

  async getProfitPercentage(user_id, year, month) {
    try {
      return await this.repository.profitPercentage(user_id, year, month);
    } catch (error) {
      throw error;
    }
  }

  async getAmount(user_id, params) {
    try {
      return await this.repository.getAmount(
        user_id,
        +params.year,
        +params.month
      );
    } catch (error) {
      throw error;
    }
  }

  async getCurrentAmount(user_id) {
    try {
      return await this.repository.getCurrentAmount(user_id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ExpenseService();
