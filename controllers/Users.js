import Users from "../models/UserModel.js";
import PiSkus from "../models/PiSkusModel.js";
import PiCurrencies from "../models/PiCurrenciesModel.js";
import PiUserSettings from "../models/PiUserSettingsModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getExpressBackend = async (req, res) => {
    try {
        res.set("Content-Type", "text/html");
        res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT FROM LHXXX2" });
    } catch (error) {
        console.log(error);
    }
}

export const getPiSkus = async (req, res) => {
    try {
        const piSkus = await PiSkus.findAll({
            attributes: ["id", "sku", "model"],
        });
        res.json(piSkus);
    } catch (error) {
        console.log(error);
    }
};

export const getPiCurrencies = async (req, res) => {
    try {
        const piCurrencies = await PiCurrencies.findAll({
            attributes: ["id", "currency"],
        });
        res.json(piCurrencies);
    } catch (error) {
        console.log(error);
    }
};

export const getPiUserSettings = async (req, res) => {
    try {
        let userID = req.query.user_id;
        const piUserSettings = await PiUserSettings.findAll({
            attributes: ["user_id", "user_name", "user_settings"],
            where: {
                user_id: userID
              }
        });
        res.json(piUserSettings);
    } catch (error) {
        console.log(error);
    }
};

export const getGRecaptcha = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "name", "email"],
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword){
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: name,
            email: email,
            password: hashPassword,
        });
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        return res.status(400).json({msg: error.errors[0].message})
    }
};

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email,
            },
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const name = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15s",
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d",
        });
        await Users.update(
            { refresh_token: refreshToken },
            {
                where: {
                    id: userId,
                },
            }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "Email not found" });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken,
        },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update(
        { refresh_token: null },
        {
            where: {
                id: userId,
            },
        }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};
