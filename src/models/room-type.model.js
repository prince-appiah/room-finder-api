const { Schema, model } = require("mongoose");

const roomTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
});

// Mongoose hooks here - if any
roomTypeSchema.pre("save", () => {});

module.exports = model("RoomType", roomTypeSchema);
