const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const colors = require("colors");

const swaggerDoc = require("./swagger.json");
const errorHandler = require("./handlers/errorHandlers");

require("dotenv").config();
const app = express();

// app.set("port", PORT);

// Middlewares
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { customSiteTitle: "Shelter API" })
);

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
app.get("/", function rootHandler(req, res, next) {
  res.redirect("/docs");
});

// Load all routes
const routes = require("./routes/index")(app);
app.use("/api/v1", routes);

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

app.use(errorHandler);

module.exports = app;
