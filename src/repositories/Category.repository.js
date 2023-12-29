import category from "../models/Category.js";
import BaseRepository from "./Base.repository.js";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(category);
  }
}

export default new CategoryRepository();
