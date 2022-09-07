const { cloudinary } = require("../config/cloudinary.config");

class UploadController {
  /**
   *
   *  */
  static async uploadImage(file, folder = null) {
    try {
      const response = await cloudinary.uploader.upload(file, { folder });

      return response;
    } catch (error) {
      console.log("🚀 ~ cloudinary error", error);
    }
  }
}

module.exports = UploadController;
