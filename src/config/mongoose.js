const mongoose = require("mongoose");
const { db } = require("./constants");

mongoose.Promise = Promise;

exports.connectDatabase = async () => {
  try {
    const dbUrl =
      process.env.ENV === "development"
        ? "mongodb://localhost:27017/shelter"
        : db.URL;

    await mongoose.connect(dbUrl, { autoCreate: true });

    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error:", error);
      process.exit(-1);
    });

    return mongoose.connection;
  } catch (error) {
    console.log("Error connecting to database:> ", error);
  }
};
