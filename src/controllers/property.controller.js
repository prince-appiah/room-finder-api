const Sentry = require("@sentry/node");
const PropertyRepo = require("../repositories/property.repo");
const UploadController = require("./upload.controller");
const { uploadImage } = require("./upload.controller");

class RoomController {
  static async addProperty(req, res) {
    try {
      const {
        owner,
        name,
        roomType,
        price,
        description,
        location,
        stayPeriod,
        amenities,
        numOfBathrooms,
        numOfBedrooms,
        referenceNo,
      } = req.body;

      const pictures = req.files;

      if (!req.files || req.files.length < 2) {
        return res.status(400).json({
          msg: "Upload images of the property and must be more than one",
        });
      }

      if (
        !owner ||
        !name ||
        !roomType ||
        !price ||
        !description ||
        !location ||
        !stayPeriod ||
        !amenities ||
        !numOfBathrooms ||
        !numOfBedrooms ||
        !referenceNo
      ) {
        return res.status(400).json({ msg: "Please fill all fields" });
      }

      // todo upload the images ater property has been created - consider moving to the create room function

      const result = await PropertyRepo.createRoom({
        owner,
        name,
        roomType,
        price,
        description,
        location,
        stayPeriod,
        amenities,
        pictures,
        referenceNo,
        numOfBathrooms,
        numOfBedrooms,
      });

      return res.status(201).json(result);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return error;
    }
  }

  static async getAll(req, res) {
    try {
      const result = await PropertyRepo.getProperties();

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async findProperty(req, res) {
    try {
      const { id } = req.params;
      const result = await PropertyRepo.getPropertyById(id);

      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async approveListing(req, res) {
    try {
      const { property_id } = req.query;
      const { isApproved } = req.body;

      if (!property_id) {
        return res.status(400).json({ msg: "Property ID is required" });
      }

      if (!isApproved) {
        return res.status(400).json({ msg: "Property status must be set" });
      }

      const result = await PropertyRepo.approveListing({
        property_id,
        isApproved,
      });

      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (error) {
      console.log("🚀 ~ error", error);
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async updateProperty(req, res) {
    try {
      const { id } = req.params;

      // TODO: validate the data
      const {
        name,
        roomType,
        price,
        description,
        location,
        stayPeriod,
        amenities,
        numOfBathrooms,
        numOfBedrooms,
      } = req.body;

      if (!id) {
        return res.status(400).json({ msg: "Property ID is required" });
      }

      const result = await PropertyRepo.updateProperty({
        id,
        name,
        roomType,
        price,
        description,
        location,
        stayPeriod,
        amenities,
        numOfBathrooms,
        numOfBedrooms,
      });

      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
  static async deleteProperty(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Property ID is required" });
      }

      const result = await PropertyRepo.deleteProperty(id);

      if (result.status === 200) {
        return res.status(200).json(result);
      }

      if (result.status === 404) {
        return res.status(404).json(result);
      }

      return res.status(304).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = RoomController;
