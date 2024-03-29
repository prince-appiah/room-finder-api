require("dotenv").config();

const http = require("http");
const colors = require("colors");
const app = require("./app");
const { connectDatabase } = require("./config/mongoose");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, HOST, async () => {
  try {
    console.log(`Server running at ${HOST}:${PORT}`.green.inverse);

    const db = await connectDatabase();

    if (db) {
      console.log("Database connected...".cyan.inverse);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log("error connecting to server", error);
  }
});
