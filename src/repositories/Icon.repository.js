import icon from "../models/Icon.js";
import BaseRepository from "./Base.repository.js";

class IconRepository extends BaseRepository {
  constructor() {
    super(icon);
  }
}

export default new IconRepository();
