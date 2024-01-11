import CategoryRepository from "../repositories/Category.repository.js";
import BaseService from "./Base.service.js";

class CategoryService extends BaseService {
  constructor() {
    super(CategoryRepository);
  }

  async getAll(user_id, params) {
    try {
      let query = {
        user_id: user_id,
      };

      if (params.keyword) {
        query = {
          ...query,
          category_name: { $regex: params.keyword, $options: "i" },
        };
      }

      const result = await this.repository.getAll(query);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
