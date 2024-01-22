import express from "express";

import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getCategories);

router.get("/:cid", isAuthenticated, getCategoryById);

router.delete("/:cid", isAuthenticated, deleteCategoryById);

router.post("/", isAuthenticated, createCategory);

router.put("/:cid", isAuthenticated, updateCategoryById);

export default router;
