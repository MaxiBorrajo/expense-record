import UserRepository from "../repositories/User.repository.js";
import BaseService from "./Base.service.js";
import { deleteImageInCloud } from "../middlewares/uploadsImage.middleware.js";
import ExpenseService from "./Expense.service.js";

class UserService extends BaseService {
  constructor() {
    super(UserRepository);
  }

  async updateById(id, object) {
    try {
      if (object.publicId && object.urlProfilePhoto) {
        const foundObject = await this.getById(id);
        await deleteImageInCloud(foundObject.publicId);
      }

      const updatedObject = await super.updateById(id, object);

      return updatedObject;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const deletedObject = await super.deleteById(id);

      await ExpenseService.deleteManyByFilter({ user_id: id });

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
