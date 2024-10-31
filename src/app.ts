import express from "express";
import env from "dotenv";
import sequelize from "@/init/sequelize";

// 初始化env
env.config();

const app = express();
const port = 3000;

sequelize.sync();

app.listen(port);
