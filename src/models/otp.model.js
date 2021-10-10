"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otp.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        //   unique:true,
        allowNull: false,
      },

      otp: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get: function () {
          this.getDataValue("expiry_date");
        },
        //   isVerified: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue:false,
        //     allowNull: true,
        //   },
      },
    },
    {
      sequelize,
      modelName: "Otp",
      tableName: "UserOtps",
      timestamps: true,
      createdAt: "created_on",
      updatedAt: "updated_at",
    }
  ).sync();

  return Otp;
};
