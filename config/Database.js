import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const db = new Sequelize(process.env.DB_MAIN, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_LOCALHOST,
    dialect: "mysql",
});

export default db;
