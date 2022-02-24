const Sentry = require("@sentry/node");

const AmenityRepo = require("../repositories/amenity.repo");

class AmenityController {
  static async listAll(req, res) {
    try {
      console.log("req.uder", req.user);
      const result = await AmenityRepo.listAll();

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async create(req, res) {
    try {
      const { name, icon } = req.body;

      if (!name) return res.status(400).json({ message: "Name is required" });

      const result = await AmenityRepo.createAmenity({ name, icon });
      if (result) {
        return res.status(201).json(result);
      }

      return res.status(400).json({ message: "Amenity already exists" });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, icon } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Amenity ID is required" });
      }

      const result = await AmenityRepo.updateAmenity({ id, name, icon });

      if (result) {
        return res.status(201).json(result);
      }

      return res.status(304).json({ message: "Could not update amenity" });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(400).json({ message: "Amenity ID is required" });

      const result = await AmenityRepo.removeAmenity({ id });
      if (result) {
        return res.status(204).json(result);
      }

      return res.status(304).json({ message: "Could not remove amenity" });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = AmenityController;
