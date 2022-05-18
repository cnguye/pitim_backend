import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PiSkus = db.define(
    "pi_tim_currencies",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        currency: {
            type: DataTypes.STRING,
        }
    },
    {
        freezeTableName: true,
    }
);

(async () => {
    await db.sync();
})();

export default PiSkus;
