module.exports = {
  handleMongooseError: function (error) {
    if (error.name === "ValidationError") {
      return {
        status: 400,
        msg: error.message,
      };
    }
    if (error.name === "MongoError" && error.code === 11000) {
      return {
        status: 400,
        msg: "Duplicate key error",
      };
    }
    console.log("Mongoose Error caught", error);
    return {
      status: 500,
      msg: error.message,
    };
  },
};
