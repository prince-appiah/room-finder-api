const Sentry = require("@sentry/node");
const RoomTypeRepo = require("../repositories/room-type.repo");

class RoomTypeController {
  static async listAll(req, res) {
    try {
      const result = await RoomTypeRepo.listCategories();

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async create(req, res) {
    try {
      const { name, icon } = req.body;

      if (!name) return res.status(400).json({ message: "Name is required" });

      const result = await RoomTypeRepo.createCategory({ name, icon });

      if (result) {
        return res.status(201).json(result);
      }

      return res.status(400).json({ message: "Room Type already exists" });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, icon } = req.body;

      if (!id)
        return res.status(400).json({ message: "A room ID is required" });

      const result = await RoomTypeRepo.updateRoomType({ id, name, icon });

      if (result) {
        return res.status(201).json(result);
      }

      return res.status(304).json({ message: "Could not update room type" });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(400).json({ message: "A room ID is required" });

      const result = await RoomTypeRepo.removeRoomType({ id });

      if (result) {
        return res.status(204).json(result);
      }

      return res.status(304).json({ message: "Could not delete room type" });
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = RoomTypeController;
