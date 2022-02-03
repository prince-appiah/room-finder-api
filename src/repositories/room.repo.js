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
      const room = await Room.create(data);

      console.log("room...", room);
      return room;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async getRoomById(id) {
    try {
      const room = await Room.findOne({ where: { id } });
      return room;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async updateRoom(id) {
    try {
      // check if room exists
      // after update, find and return the updated record
      const room = await this.getRoomById(id);
      if (room) {
      }
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  static async deleteRoom(id) {
    try {
      // check if room exists
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}

module.exports = RoomRepo;
