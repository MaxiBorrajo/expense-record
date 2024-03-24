import UserRepository from "../repositories/User.repository.js";
import BaseService from "./Base.service.js";
import ExpenseService from "./Expense.service.js";
import ExpenseRepository from "../repositories/Expense.repository.js";
import { removeAutomaticRegister } from "../utils/scheduler.js";
import { errors } from "../utils/errorDictionary.js";
import SavingGoalService from "./SavingGoal.service.js";
class UserService extends BaseService {
  constructor() {
    super(UserRepository);
  }

  async updateById(id, object) {
    try {
      if (object.budget <= 0) {
        throw new errors.BUDGET_MUST_BE_GREATER_THAN_ZERO();
      }

      return super.updateById(id, object);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const deletedObject = await super.deleteById(id);

      const expenseJobs = await ExpenseRepository.getAll({
        user_id: id,
        isAutomaticallyCreated: true,
      });

      expenseJobs.forEach((job) => {
        removeAutomaticRegister(job.jobId);
      });

      await SavingGoalService.deleteByFilter({ user_id: id });

      await ExpenseService.deleteManyByFilter({ user_id: id });

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
