const { captureException } = require("@sentry/node");
const amenityModel = require("../models/amenity.model");

class AmenityRepo {
  static async listAll() {
    try {
      const res = await amenityModel.find({}).select("-__v");

      return res;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }

  static async getSingleAmenity(id) {
    try {
      const res = await amenityModel.findById(id).select("-__v");

      return res;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }

  static async createAmenity({ name, icon }) {
    try {
      const existingAmenity = await amenityModel.findOne({ name });
      if (existingAmenity) {
        return null;
      }

      const result = await amenityModel.create({ name, icon });
      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }

  static async updateAmenity({ id, name, icon }) {
    try {
      const existingAmenity = await amenityModel.findOne({ _id: id });
      if (!existingAmenity) {
        return null;
      }

      const result = await amenityModel.findOneAndUpdate(
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
      const result = await amenityModel.findOneAndRemove({ _id: id });

      return result;
    } catch (error) {
      console.log("🚀 ~ error", error);
      captureException(error);
    }
  }
}

module.exports = AmenityRepo;
