import UserRepository from "../repositories/User.repository.js";
import BaseService from "./Base.service.js";

import ExpenseService from "./Expense.service.js";

class UserService extends BaseService {
  constructor() {
    super(UserRepository);
  }

  async deleteById(id) {
    try {
      const deletedObject = await this.repository.deleteById(id);

      await ExpenseService.deleteManyByFilter({ user_id: id });

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
