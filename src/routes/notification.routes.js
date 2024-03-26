import express from "express";

import {
  deleteNotification,
  getNotifications,
  readNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getNotifications);

router.put("/", readNotifications);

router.delete("/:nid", deleteNotification);

export default router;
