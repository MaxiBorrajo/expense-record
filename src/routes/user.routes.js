import express from "express";

import { updateUser, deleteUser, getCurrentUser } from "../controllers/user.controller.js";

import { body_must_not_contain_attributes } from "../middlewares/validateRequests.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

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
  updateUser
);

router.delete("/", isAuthenticated, deleteUser);

export default router;
