const { captureException } = require("@sentry/node");
const Amenity = require("../models/amenity.model");

class AmenityRepo {
  static async listAll() {
    try {
      const res = await Amenity.find({}).select("-__v");
      return res;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }

  static async getSingleAmenity(id) {
    try {
      const res = await Amenity.findById(id).select("-__v");
      return res;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }

  static async createAmenity({ name, icon }) {
    try {
      const existingAmenity = await Amenity.findOne({ name });
      if (existingAmenity) {
        return null;
      }

      const result = await Amenity.create({ name, icon });
      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }

  static async updateAmenity({ id, name, icon }) {
    try {
      const existingAmenity = await Amenity.findOne({ _id: id });
      if (!existingAmenity) {
        return null;
      }

      const result = await Amenity.findOneAndUpdate(
        { _id: id },
        { name, icon },
        { new: true }
      );

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }

  static async removeAmenity({ id }) {
    try {
      const result = await Amenity.findOneAndRemove({ _id: id });
      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }
}

module.exports = AmenityRepo;
