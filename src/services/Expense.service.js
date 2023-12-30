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
        createdAt: {
          $gte: this.firstDateOfMonth(),
          $lte: this.finalDateOfMonth(),
        },
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

  firstDateOfMonth() {
    const startDate = new Date();
    return new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  }

  finalDateOfMonth() {
    const endDate = new Date();
    return new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
  }

  applyFilters(query, params) {
    if (params.startDate && params.endDate) {
      query = {
        ...query,
        createdAt: {
          $gte: params.startDate,
          $lte: params.endDate,
        },
      };
    }

    if (params.category) {
      query = {
        ...query,
        category_id: params.category,
      };
    }

    if (params.type && params.type === "income") {
      query = {
        ...query,
        amount: {
          $gt: 0,
        },
      };
    }

    if (params.type && params.type === "loss") {
      query = {
        ...query,
        amount: {
          $lt: 0,
        },
      };
    }

    if (params.keyword) {
      query = {
        ...query,
        $or: [
          { title: { $regex: params.keyword, $options: "i" } },
          { description: { $regex: params.keyword, $options: "i" } },
        ],
      };
    }

    return query;
  }

  async getStatistics(user_id, year, month) {
    try {
      return await this.repository.getStatistics(user_id, year, month);
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

  async getCurrentAmount(user_id) {
    try {
      return await this.repository.getCurrentAmount(user_id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ExpenseService();
