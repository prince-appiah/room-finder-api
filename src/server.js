const app = require("./app");
const { connectDatabase } = require("./config/mongoose");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, async () => {
  try {
    console.log(`Server running at ${HOST}:${PORT}`.green.inverse);

    const db = await connectDatabase();

    try {
      if (db) {
        console.log("Database connected...".cyan.inverse);
      } else {
        console.log("Could not connect to database...".red.inverse);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.log("error connecting to database...", error);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log("error connecting to server", error);
  }
});
