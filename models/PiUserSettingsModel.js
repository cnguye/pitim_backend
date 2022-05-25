import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PiUserSettings = db.define(
    "pi_tim_user_settings",
    {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
        },
        user_settings: {
            type: DataTypes.TEXT,
        },
    },
    {
        freezeTableName: true,
    }
);

(async () => {
    await db.sync();
})();

export default PiUserSettings;
