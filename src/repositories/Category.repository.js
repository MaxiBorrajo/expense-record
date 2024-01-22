import category from "../models/Category.js";
import BaseRepository from "./Base.repository.js";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(category);
  }

  async getByFilter(filter) {
    try {
      const foundObject = await this.model.findOne(filter).populate({
        path: "icon_id",
        model: "icons",
      });

      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async getAll(query) {
    try {
      const foundObjects = await this.model
        .find(query)
        .sort([["createdAt", "desc"]])
        .populate({
          path: "icon_id",
          model: "icons",
        });

      return foundObjects;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryRepository();
