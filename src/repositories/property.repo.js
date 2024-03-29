const Sentry = require("@sentry/node");
const UploadController = require("../controllers/upload.controller");
const Host = require("../models/host.model");
const Image = require("../models/image.model");
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
    amenities,
    stayPeriod,
    color,
    pictures,
    referenceNo,
    numOfBathrooms,
    numOfBedrooms,
  }) {
    try {
      const images = [];

      for (const pic of pictures) {
        const response = await UploadController.uploadImage(pic.path, "/properties");
        const newImage = await Image.create(response);
        images.push(newImage._id);
      }

      const property = new Property({
        owner,
        name,
        roomType,
        price,
        description,
        location,
        stayPeriod,
        color,
        images,
        amenities,
        referenceNo,
        numOfBathrooms,
        numOfBedrooms,
      });

      await property.save();

      const createdProperty = await Property.findOne({ _id: property._id })
        .select("-__v")
        .populate("owner", "-__v")
        .populate("roomType", "-__v")
        .populate("images", "-__v")
        .populate("amenities", "-__v");

      return createdProperty;
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
        .populate("owner", "-__v")
        .populate("roomType", "-__v")
        .populate("images", "-__v")
        .populate("amenities", "-__v");

      // .populate({ path: "owner", select: { email: 1 } });

      return property;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getHostProperties({ user_id }) {
    try {
      const host = await Host.findOne({ user_id });
      const listings = await Property.find({
        owner: { $eq: host._id },
      })
        .select("-__v")
        .populate("interestedParties", "-__v")
        .populate("roomType", "-__v")
        .populate("images", "-__v")
        .populate("amenities", "-__v");

      return listings;
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
        .populate("roomType", "-__v")
        .populate("images", "-__v")
        .populate("amenities", "-__v");

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

  static async updateProperty({
    id,
    name,
    roomType,
    price,
    description,
    location,
    stayPeriod,
    amenities,
    numOfBathrooms,
    color,
    numOfBedrooms,
  }) {
    try {
      // TODO write function to merge array of ids for amenities
      // TODO write function to add and remove images from cloudinary
      let response = { msg: "", status: null, data: null };

      // check if room exists
      const existingProperty = await Property.findOne({ _id: id });

      if (!existingProperty) {
        return { ...response, msg: "Property not found", status: 404 };
      }

      const result = await Property.findOneAndUpdate(
        { _id: id },
        {
          name,
          roomType,
          price,
          description,
          location,
          stayPeriod,
          color,
          amenities,
          numOfBathrooms,
          numOfBedrooms,
        },
        {
          new: true,
        },
      );
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

  static async approveListing({ property_id, isApproved }) {
    try {
      let response = { msg: "", status: null, data: null };

      // check if room exists
      const existingProperty = await Property.findOne({ _id: property_id });

      if (!existingProperty) {
        return { ...response, msg: "Property not found", status: 404 };
      }

      const result = await Property.findOneAndUpdate({ _id: property_id }, { isApproved }, { new: true });

      const updatedProperty = await Property.findOne({ _id: result._id })
        .select("-__v")
        .populate("owner", "-__v")
        .populate("roomType", "-__v")
        .populate("images", "-__v")
        .populate("amenities", "-__v");

      return {
        ...response,
        msg: "Property approved",
        status: 200,
        data: updatedProperty,
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
          deleted_property_id: id,
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
