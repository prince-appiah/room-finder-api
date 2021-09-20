import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import colors from "colors";

import { initializeDB } from "./db.js";
import swaggerDoc from "./src/swagger.json";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.set("port", PORT);
app.set("host", HOST);

// Middlewares
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

Sentry.init({
  dsn: process.env.DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
app.get("/", function rootHandler(req, res) {
  res.redirect("/docs");
});

// The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler());
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 404 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

app.listen(PORT, HOST, async () => {
  try {
    console.log(`Server running at ${HOST}:${PORT}`.green.inverse);

    const db = await initializeDB();
    try {
      if (db) {
        console.log("Database connected...".cyan.inverse);
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

// export default app;
