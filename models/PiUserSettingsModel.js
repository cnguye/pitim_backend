import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PiUserSettings = db.define(
    "pi_tim_user_settings",
    {
        user_id: {
            type: DataTypes.INTEGER,
        },
        user_name: {
            type: DataTypes.STRING,
        },
        user_settings: {
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

export default PiUserSettings;
