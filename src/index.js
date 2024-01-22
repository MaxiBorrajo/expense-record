import app from "./server.js";
import databaseConnection from "./config/database.connection.js";
import executeExpenseMock from "./mocks/expenses.mock.js";
import executeIconMock from "./mocks/icon.mock.js";
import executeCategoryMock from "./mocks/category.mock.js";
async function startServer() {
  try {
    databaseConnection();

    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
    //  await executeIconMock();
   // await executeCategoryMock();
   //await executeExpenseMock();
  } catch (error) {
    throw error;
  }
}

startServer();
