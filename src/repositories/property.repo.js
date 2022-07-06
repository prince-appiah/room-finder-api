const Sentry = require("@sentry/node");
const Host = require("../models/host.model");
const Property = require("../models/property.model");

class RoomRepo {
  /**
   * @description Add room to database
   *
   * @param {Object} data - contains room data
   * @param {String} data.name
   * @param {String} data.price
   * @param {String} data.description
   * @param {String} data.address
   *
   * @returns {Promise<Room>} Instance of room model
   *  */
  static async createRoom({
    owner,
    name,
    roomType,
    price,
    description,
    location,
    stayPeriod,
    images,
  }) {
    try {
      let response = { msg: "", status: null, data: null };

      const property = await Property.create({
        owner,
        name,
        roomType,
        price,
        description,
        location,
        stayPeriod,
        images,
      });

      return property;
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async getProperties() {
    try {
      const property = await Property.find({})
        .select("-__v")
        .populate("owner", "-__v");
      // .populate({ path: "owner", select: { email: 1 } });

      return property;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getPropertyById(id) {
    try {
      let response = { msg: "", status: null, data: null };

      const property = await Property.findOne({ _id: id })
        .select("-__v")
        .populate("owner", "-__v")
        .populate("roomType", "-__v");
      // .populate("owner", { firstname: 1 })
      // .populate({ path: "owner" });

      if (property) {
        return { ...response, msg: "Success", status: 200, data: property };
      }
      return { ...response, msg: "Property not found", status: 404 };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async updateProperty(id, payload) {
    try {
      let response = { msg: "", status: null, data: null };

      // check if room exists
      const existingProperty = await Property.findOne({ _id: id });

      if (!existingProperty) {
        return { ...response, msg: "Property not found", status: 404 };
      }

      const result = await Property.findOneAndUpdate({ _id: id }, payload, {
        new: true,
      });
      return {
        ...response,
        msg: "Update successful",
        status: 200,
        data: result,
      };
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async deleteProperty(id) {
    try {
      let response = { msg: "", status: null, data: null };
      // check if room exists
      const existingProperty = await Property.findOne({ _id: id });
      if (!existingProperty) {
        return { ...response, msg: "Property not found", status: 404 };
      }

      const result = await Property.findOneAndRemove({ _id: id });

      if (result) {
        return {
          ...response,
          msg: "Property deleted",
          status: 200,
          data: result,
        };
      }
      return { ...response, msg: "Could not delete property", status: 400 };
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = RoomRepo;
