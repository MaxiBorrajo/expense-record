import user from "../models/User.js";
import BaseRepository from "./Base.repository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(user);
  }
}

export default new UserRepository();
