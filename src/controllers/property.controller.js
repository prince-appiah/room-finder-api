const Sentry = require("@sentry/node");
const PropertyRepo = require("../repositories/property.repo");

class RoomController {
  static async addRoom(req, res) {
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
        images,
        numOfBathrooms,
        numOfBedrooms,
      } = req.body;

      if (
        !owner ||
        !name ||
        !roomType ||
        !price ||
        !description ||
        !location ||
        !stayPeriod ||
        !images ||
        !amenities ||
        !numOfBathrooms ||
        !numOfBedrooms
      ) {
        return res.status(400).json({ msg: "Please fill all fields" });
      }

      const result = await PropertyRepo.createRoom({
        owner,
        name,
        roomType,
        price,
        description,
        location,
        stayPeriod,
        images,
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

  static async updateProperty(req, res) {
    try {
      const { id } = req.params;

      // TODO: validate the data
      const payload = req.body;

      if (!id) {
        return res.status(400).json({ msg: "Property ID is required" });
      }

      const result = await PropertyRepo.updateProperty(id, payload);

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
      const result = await PropertyRepo.deleteProperty(id);

      if (result.status === 200) {
        return res.status(204).json(result);
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
