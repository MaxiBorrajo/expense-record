import password_reset_code from "../models/PasswordResetCode.js";
import BaseRepository from "./Base.repository.js";

class PasswordResetCodeRepository extends BaseRepository {
  constructor() {
    super(password_reset_code);
  }
}

export default new PasswordResetCodeRepository();
