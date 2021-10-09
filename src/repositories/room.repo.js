const Sentry = require("@sentry/node");
const models = require("../models");

const { Room } = models;

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
  static async createRoom(data) {
    try {
      const room = await Room.build(data);

      console.log("room...", room);
      return room;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = RoomRepo;
