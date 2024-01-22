import express from "express";

import { updateUser, deleteUser, getCurrentUser } from "../controllers/user.controller.js";

import { body_must_not_contain_attributes } from "../middlewares/validateRequests.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import { multerUploads, processImage } from "../middlewares/uploadsImage.middleware.js";
const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  getCurrentUser
);

router.put(
  "/",
  isAuthenticated,
  body_must_not_contain_attributes(["_id", "email", "password", "oauthuser"]),
  multerUploads, 
  processImage,
  updateUser
);

router.delete("/", isAuthenticated, deleteUser);

export default router;
