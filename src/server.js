//Imports
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import expenseRoute from "./routes/expense.routes.js";
import iconRoute from "./routes/icon.routes.js";
import categoryRoute from "./routes/category.routes.js";
import savingGoalRoute from "./routes/savingGoal.routes.js";
import notificationRoute from "./routes/notification.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/expenses", expenseRoute);
app.use("/api/icons", iconRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/savingGoals", savingGoalRoute);
app.use("/api/notifications", notificationRoute);

app.use(errorHandlerMiddleware);

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

export default app;
