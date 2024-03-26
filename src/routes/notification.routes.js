import express from "express";

import {
  deleteNotification,
  getNotifications,
  readNotification,
} from "../controllers/notification.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotifications);

router.put("/:nid", isAuthenticated, readNotification);

router.delete("/:nid", isAuthenticated, deleteNotification);

export default router;
