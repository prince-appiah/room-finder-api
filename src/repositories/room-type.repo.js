const Sentry = require("@sentry/node");
const RoomType = require("../models/room-type.model");

class RoomTypeRepo {
  static async listCategories() {
    try {
      const result = await RoomType.find({}).select("-__v");

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async getSingleAmenity(id) {
    try {
      const result = await RoomType.findById(id).select("-__v");

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async createCategory({ name, icon }) {
    try {
      const existingType = await RoomType.findOne({ name });
      if (existingType) {
        return null;
      }
      const result = await RoomType.create({ name, icon });

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async updateRoomType({ id, name, icon }) {
    try {
      const existingType = await RoomType.findOne({ _id: id });
      if (!existingType) {
        return null;
      }

      const result = await RoomType.findOneAndUpdate({ _id: id }, { name, icon }, { new: true });

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      // return error;
    }
  }

  static async removeRoomType({ id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingType = await RoomType.findOne({ _id: id });
      if (!existingType) {
        return { ...response, msg: "Property type not found", status: 404 };
      }
      //
      const result = await RoomType.findOneAndRemove({ _id: id });

      if (result) {
        return { ...response, msg: "Property type deleted", status: 200, deleted_property_type_id: id };
      }

      return { ...response, msg: "Could not delete property type", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      // TODO: Handle mongoose error (id not found, cast error etc)
    }
  }
}

module.exports = RoomTypeRepo;
