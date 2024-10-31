import express from "express";
import env from "dotenv";
import router from "@/router/index";
import sequelize from "@/init/sequelize";

// 初始化env
env.config();

const app = express();
const port = 3000;

// 加入路由
app.use(router);

// 初始化資料庫套件
sequelize.sync();

app.listen(port);
