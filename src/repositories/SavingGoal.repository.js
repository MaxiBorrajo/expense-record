import savingGoal from "../models/SavingGoal.js";
import BaseRepository from "./Base.repository.js";

class SavingGoalRepository extends BaseRepository {
  constructor() {
    super(savingGoal);
  }
}

export default new SavingGoalRepository();
