import express from "express";

import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyCode,
} from "../controllers/auth.controller.js";

import {
  body_must_contain_attributes,
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  body_must_not_contain_attributes
} from "../middlewares/validateRequests.middleware.js";

const router = express.Router();

router.post(
  "/",
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  body_must_not_contain_attributes(["_id"]),
  register
);

router.post(
  "/login",
  body_must_contain_attributes(["email", "password"]),
  login
);

router.post("/forgotPassword", meetsWithEmailRequirements, forgotPassword);

router.post(
  "/verify",
  meetsWithEmailRequirements,
  body_must_contain_attributes(["code"]),
  verifyCode
);

router.post(
  "/resetPassword",
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  resetPassword
);

export default router;
