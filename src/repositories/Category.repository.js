import category from "../models/Category.js";
import BaseRepository from "./Base.repository.js";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(category);
  }

  async getAll(filter) {
    try {
      const foundObjects = await this.model
        .find(filter)
        .sort([["createdAt", "desc"]]);

      return foundObjects;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryRepository();
