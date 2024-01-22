import IconRepository from "../repositories/Icon.repository.js";
import BaseService from "./Base.service.js";

class IconService extends BaseService {
  constructor() {
    super(IconRepository);
  }

  async getAll(params) {
    try {
      let query = {};

      if (params && params.keyword) {
        query = { title: { $regex: params.keyword, $options: "i" } };
      }

      const result = await this.repository.getAll(query);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new IconService();
