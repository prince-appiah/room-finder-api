const Sentry = require("@sentry/node");
const roomTypeModel = require("../models/room-type.model");

class RoomTypeRepo {
  static async listCategories() {
    try {
      const result = await roomTypeModel.find({}).select("-__v");

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async createCategory({ name, icon }) {
    try {
      const existingType = await roomTypeModel.findOne({ name });
      if (existingType) {
        return null;
      }
      const result = await roomTypeModel.create({ name, icon });

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async updateRoomType({ id, name, icon }) {
    try {
      const existingType = await roomTypeModel.findOne({ _id: id });
      if (!existingType) {
        return null;
      }

      const result = await roomTypeModel.findOneAndUpdate(
        { _id: id },
        { name, icon },
        { new: true }
      );

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      // return error;
    }
  }

  static async removeRoomType({ id }) {
    try {
      //
      const result = await roomTypeModel.findOneAndRemove({ _id: id });

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      // TODO: Handle mongoose error (id not found, cast error etc)
    }
  }
}

module.exports = RoomTypeRepo;
