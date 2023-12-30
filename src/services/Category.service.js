import CategoryRepository from "../repositories/Category.repository.js";
import BaseService from "./Base.service.js";

class CategoryService extends BaseService {
  constructor() {
    super(CategoryRepository);
  }
}

export default new CategoryService();
