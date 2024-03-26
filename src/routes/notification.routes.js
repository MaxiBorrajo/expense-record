import express from "express";

import {
  deleteNotification,
  getNotifications,
  readNotifications,
} from "../controllers/notification.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotifications);

router.put("/", isAuthenticated, readNotifications);

router.delete("/:nid", isAuthenticated, deleteNotification);

export default router;
