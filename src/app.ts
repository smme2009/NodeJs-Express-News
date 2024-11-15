import express from "express";
import env from "dotenv";
import router from "@/router/index";
import { Sequelize } from "sequelize-typescript";

// 初始化框架
const app = express();

// 初始化env
env.config();
env.config({ path: `.env.${process.env.NODE_ENV}` });

// 初始化資料庫
const sequelize: Sequelize = new Sequelize(
    process.env.DB_DATABASE ?? "",
    process.env.DB_USERNAME ?? "",
    process.env.DB_PASSWORD ?? "",
    {
        host: process.env.DB_HOST ?? "",
        dialect: "mysql",
    }
);

// 加入Model
sequelize.addModels([__dirname + "/database/model"]);

// 加入路由
app.use(router);

// 開始監聽
app.listen(process.env.APP_PORT);
