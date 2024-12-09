import Express from "express";
import Path from "path";
import FS from "fs";
import BodyParser from "body-parser";
import Env from "dotenv";
import RtBackend from "@/router/backend/index";
import RtFrontend from "@/router/frontend/index";
import { Sequelize } from "sequelize-typescript";

// 初始化框架
const app = Express();

// 取得路徑，該機制在專案結構發生變更時，需視情況進行調整
global.appPath = __dirname; // 取得app.js(ts)路徑
global.basePath = Path.join(global.appPath, ".."); // 取得專案路徑
global.storagePath = Path.join(global.basePath, "storage"); // storage路徑
global.publicPath = Path.join(global.basePath, "public"); // public路徑

// 建立公開檔案上傳資料夾
const storagePublicPath: string = `${global.storagePath}/public`;

if (FS.existsSync(storagePublicPath) === false) {
    FS.mkdirSync(storagePublicPath);
}

// 建立連結符號
const publicStoragePath: string = `${global.publicPath}/storage`;

if (FS.existsSync(publicStoragePath) === false) {
    FS.symlinkSync(storagePublicPath, publicStoragePath, "dir");
}

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

// 加入Public路由
app.use("/public", Express.static(global.publicPath));

// 開始監聽
app.listen(process.env.APP_PORT);
