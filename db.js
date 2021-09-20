import mysql2 from "mysql2/promise";
import { Sequelize } from "sequelize";
import * as dbConfig from "./src/config/db.config.js";

export const initializeDB = async () => {
  try {
    let connection = await mysql2.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      port: dbConfig.port,
    });

    const database = new Sequelize({
      host: dbConfig.host,
      database: dbConfig.database,
      username: dbConfig.user,
      password: dbConfig.password,
      dialect: "mysql",
      // logging: false,
    });

    return { database, connection };
  } catch (error) {
    console.log("error from initializeDB:>> ", error);
  }
};
