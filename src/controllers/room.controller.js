// @ts-check
const Sentry = require("@sentry/node");
const RoomRepo = require("../repositories/room.repo");

class RoomController {
  static async addRoom(req, res) {
    try {
      const payload = req.body;
      const result = await RoomRepo.createRoom(payload);
      console.log("result...", result);

      return res.status(201).json(result);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = RoomController;
