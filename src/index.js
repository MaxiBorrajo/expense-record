import app from './server.js'
import databaseConnection from "./config/database.connection.js";

function startServer() {
  try {
    databaseConnection();

    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    throw error;
  }
}

startServer();
