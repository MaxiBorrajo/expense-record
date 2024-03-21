import category from "../models/Category.js";
import BaseRepository from "./Base.repository.js";

class AutomaticRegistrationRepository extends BaseRepository {
  constructor() {
    super(category);
  }

  async getByFilter(filter) {
    try {
      const foundObject = await this.model.findOne(filter).populate({
        path: "category_id",
        populate: {
          path: "icon_id",
          model: "icons",
        },
      });

      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async getAll(query, sort = "createdAt", order = "desc") {
    //✓
    try {
      const response = await this.model
        .find(query)
        .sort([[sort, order]])
        .populate({
          path: "category_id",
          populate: {
            path: "icon_id",
            model: "icons",
          },
        });

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AutomaticRegistrationRepository();
