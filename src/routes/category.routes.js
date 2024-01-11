import express from "express";

import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);

router.get("/:cid", getCategoryById);

router.delete("/:cid", deleteCategoryById);

router.post("/", createCategory);

router.put("/:cid", updateCategoryById);

export default router;
