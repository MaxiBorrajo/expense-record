import express from "express";

import {
  createSavingGoal,
  updateSavingGoal,
  getSavingGoal,
  deleteSavingGoal,
} from "../controllers/savingGoal.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
  body_must_not_contain_attributes,
  body_must_contain_attributes,
} from "../middlewares/validateRequests.middleware.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  body_must_contain_attributes(["title", "final_amount"]),
  createSavingGoal
);

router.put(
  "/",
  isAuthenticated,
  body_must_not_contain_attributes(["current_amount", "_id", "user_id"]),
  updateSavingGoal
);

router.get("/", isAuthenticated, getSavingGoal);

router.delete("/", isAuthenticated, deleteSavingGoal);

export default router;
