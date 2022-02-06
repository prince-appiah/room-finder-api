const mongoose = require("mongoose");

mongoose.Promise = Promise;

exports.connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shelter", {
      autoCreate: true,
    });

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
