import app from "./server.js";
import databaseConnection from "./config/database.connection.js";
import executeExpenseMock from "./mocks/expenses.mock.js";
import executeIconMock from "./mocks/icon.mock.js";
import executeCategoryMock from "./mocks/category.mock.js";
import { recoverJobs } from "./utils/scheduler.js";
import { handleReceipts } from "./utils/sendNotification.js";
import schedule from "node-schedule";
async function startServer() {
  try {
    databaseConnection();
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
    //  await executeIconMock();
    // await executeCategoryMock();
    //await executeExpenseMock();
    await recoverJobs();
    schedule.scheduleJob("*/40 * * * *", async function () {
      await handleReceipts();
    });
  } catch (error) {
    throw error;
  }
}

startServer();
