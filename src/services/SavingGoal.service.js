import SavingGoalRepository from "../repositories/SavingGoal.repository.js";
import { errors } from "../utils/errorDictionary.js";
import BaseService from "./Base.service.js";
import Expense from "../models/Expense.js";
import mongoose from "mongoose";

class SavingGoalService extends BaseService {
  constructor() {
    super(SavingGoalRepository);
  }

  async getTotalSaving(savingGoal, user_id) {
    const result = await Expense.aggregate([
      {
        $match: {
          user_id: user_id,
          category_id: new mongoose.Types.ObjectId("65cf719ad7d2035b7f1ca18f"),
          createdAt: {
            $gte: new Date(savingGoal.createdAt),
          },
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

    return result;
  }

  async recalculateSavingGoal(user_id) {
    const savingGoal = await this.getByFilter({ user_id: user_id });

    if (savingGoal) {
      const totalSaving = await this.getTotalSaving(savingGoal, user_id);

      const total = totalSaving && totalSaving[0] ? totalSaving[0]?.total : 0;

      savingGoal.current_amount = total*-1;

      await savingGoal.save();
    }

    if (savingGoal && savingGoal.current_amount >= savingGoal.final_amount) {
      //push notification
      console.log("Alcanzaste tu meta perro");
    }
  }

  async checkSavingGoal(object) {
    const savingGoal = await this.getByFilter({ user_id: object.user_id });

    if (savingGoal) {
      savingGoal.current_amount += object.amount * -1;

      await savingGoal.save();
    }

    if (
      savingGoal &&
      savingGoal.current_amount + object.amount * -1 >= savingGoal.final_amount
    ) {
      //push notification
      console.log("Alcanzaste tu meta perro");
    }
  }

  async create(object) {
    try {
      const foundSavingGoal = await this.getByFilter({
        user_id: object.user_id,
      });

      if (foundSavingGoal) {
        throw new errors.SAVING_GOAL_ALREADY_EXISTS();
      }

      if (object.final_amount <= 0) {
        throw new errors.SAVING_GOAL_MUST_BE_GREATER_THAN_ZERO();
      }

      return super.create(object);
    } catch (error) {
      throw error;
    }
  }
}

export default new SavingGoalService();
