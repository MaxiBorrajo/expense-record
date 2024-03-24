import mongoose from "mongoose";
import { errors } from "../utils/errorDictionary.js";
mongoose.set("strictQuery", true);
async function databaseConnection() {
  await mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(async (res) => {
      console.log("Successfully connected to database");
    })
    .catch((err) => {
      console.log(err);
      throw new errors.DATABASE_CONNECTION_FAILED();
    });
}

export default databaseConnection;
