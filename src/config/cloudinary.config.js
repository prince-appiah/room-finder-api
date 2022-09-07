const { cloud } = require("./constants");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: cloud.CLOUD_NAME,
  api_key: cloud.API_KEY,
  api_secret: cloud.API_SECRET,
});

// cloudinary.uploader.upload()

module.exports = { cloudinary };
