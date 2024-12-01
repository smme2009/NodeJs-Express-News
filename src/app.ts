import Express from "express";
import BodyParser from "body-parser";
import Env from "dotenv";
import RtBackend from "@/router/backend/index";
import RtFrontend from "@/router/frontend/index";
import { Sequelize } from "sequelize-typescript";

// 初始化框架
const app = Express();

// 初始化env
Env.config();

// 初始化資料庫
const sequelize: Sequelize = new Sequelize(
    process.env.DB_DATABASE!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        dialect: "mysql",
    }
);

// 加入Model
sequelize.addModels([__dirname + "/database/model"]);

// 接收Body參數設定
app.use(
    BodyParser.urlencoded({
        extended: true,
    })
);

// 加入後台路由
app.use(RtBackend);

// 加入前台路由
app.use(RtFrontend);

// 開始監聽
app.listen(process.env.APP_PORT);
