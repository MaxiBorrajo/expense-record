import express from "express";

import { getIcons } from "../controllers/icon.controller.js";

const router = express.Router();

router.get("/", getIcons);

export default router;
