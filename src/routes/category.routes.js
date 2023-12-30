import express from "express";

import {
  deleteCategory,
  createCategory,
  getAll,
  updateCategory,
} from "../controllers/category.controller.js";

import {
  body_must_not_contain_attributes,
  body_must_contain_attributes,
} from "../middlewares/validateRequests.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getAll);

router.post(
  "/",
  isAuthenticated,
  body_must_contain_attributes(["category_name"]),
  body_must_not_contain_attributes(["_id", "user_id"]),
  createCategory
);

router.put(
  "/:cid",
  isAuthenticated,
  body_must_not_contain_attributes(["_id", "user_id"]),
  updateCategory
);

router.delete("/:cid", isAuthenticated, deleteCategory);

export default router;
