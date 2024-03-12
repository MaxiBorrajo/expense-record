import express from "express";

import {
  createExpense,
  deleteExpenseById,
  getAmount,
  getExpenseById,
  getExpenses,
  getStatistics,
  updateExpenseById,
  applyConversion,
  getBalance,
  getStatisticsByCategory,
} from "../controllers/expense.controller.js";

import {
  body_must_not_contain_attributes,
  body_must_contain_attributes,
} from "../middlewares/validateRequests.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getExpenses); //✓

router.get("/amount", isAuthenticated, getAmount); //✓

router.get("/balance", isAuthenticated, getBalance); //✓

router.get("/statistics", isAuthenticated, getStatistics); //✓

router.get("/statisticsByCategory", isAuthenticated, getStatisticsByCategory); //✓

router.get("/:eid", isAuthenticated, getExpenseById); //✓

router.post(
  //✓
  "/",
  isAuthenticated,
  body_must_contain_attributes(["title", "amount"]),
  body_must_not_contain_attributes(["_id", "user_id"]),
  createExpense
);

router.put(
  "/conversion",
  isAuthenticated,
  body_must_contain_attributes(["old_currency", "new_currency"]),
  applyConversion
);

router.put(
  "/:eid",
  isAuthenticated,
  body_must_not_contain_attributes(["_id", "user_id"]),
  updateExpenseById
);

router.delete("/:eid", isAuthenticated, deleteExpenseById);

export default router;
