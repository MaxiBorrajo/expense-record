//Imports
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";

import authRoute from "./routes/auth.routes.js"
import userRoute from "./routes/user.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use(errorHandlerMiddleware);

export default app;
