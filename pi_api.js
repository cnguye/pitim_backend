import express from "express";
import dotenv from "dotenv";
dotenv.config({path: "~/.env"});
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
const app = express();

const URL = process.env.SERVER_URL === undefined ?
    'http://localhost:3000'
    : process.env.SERVER_URL;
    
app.use(cors({ credentials:true, origin:`${URL}` }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(process.env.SERVER_PORT, ()=> console.log(`Server running at port ${process.env.SERVER_PORT}`));