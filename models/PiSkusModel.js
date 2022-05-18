import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PiSkus = db.define(
    "pi_tim_models",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        sku: {
            type: DataTypes.STRING,
        },
        model: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

(async () => {
    await db.sync();
})();

export default PiSkus;
