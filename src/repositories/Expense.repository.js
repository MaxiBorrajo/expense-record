import expense from "../models/Expense.js";
import BaseRepository from "./Base.repository.js";

class ExpenseRepository extends BaseRepository {
  constructor() {
    super(expense);
  }
}

export default new ExpenseRepository();
