const Sentry = require("@sentry/node");
const RoomRepo = require("../repositories/room.repo");

class RoomController {
  static async addRoom(req, res) {
    try {
      const payload = req.body;
      const result = await RoomRepo.createRoom(payload);

      return res.status(201).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async findRoom(req, res) {
    try {
      const payload = req.params.roomId;
      const result = await RoomRepo.getRoomById(payload);

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async updateRoom(req, res) {
    try {
      const payload = req.params.roomId;
      const result = await RoomRepo.updateRoom(payload);

      return res.status(200).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
  static async deleteRoom(req, res) {
    try {
      const payload = req.params.roomId;
      const result = await RoomRepo.deleteRoom(payload);

      return res.status(209).json(result ?? { msg: "Success" });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = RoomController;
