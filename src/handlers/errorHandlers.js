const errorHandler = (err, req, res, next) => {
  try {
    console.log("You hit the error handler");
    console.log("🚀 ~ err", err);

    if (err.name === "ValidationError") {
      const response = handleValidationError(err, res);
      return response;
      //   return res.status(400).json({
      //     status: 400,
      //     msg: err.message,
      //   });
    }

    if (err.code && err.code === 11000) {
      const response = handleDuplicateKeyError(err, res);
      return response;
      //   return res.status(409).json({
      //     status: 409,
      //     msg: "Duplicate key error",
      //   });
    }

    if (err.name === "MongoServerError") {
      console.log("mongo err", err);
      return res.status(500).json({
        status: 500,
        msg: err.message,
      });
    }
  } catch (error) {
    return res.status(500).send("An unknown error occurred");
  }
};

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);

  return res.status(409).send(`Duplicate key error: ${field} already exists`);
};

const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const fields = Object.values(err.errors).map((error) => error.path);

  if (errors.length > 1) {
    const errorMessage = errors.join(", ");

    return res.status(400).send({ msgs: errorMessage, fields });
  }

  return res.status(400).send({ msg: errors[0], fields });
};

module.exports = errorHandler;
