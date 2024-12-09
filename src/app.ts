import Express from "express";
import Path from "path";
import FS from "fs";
import BodyParser from "body-parser";
import Env from "dotenv";
import RtBackend from "@/router/backend/index";
import RtFrontend from "@/router/frontend/index";
import { Sequelize } from "sequelize-typescript";

// 初始化env
Env.config();

// 建立全域的系統相關路徑變數
setGlobalPath();

// 建立檔案系統相關路徑
setFilePath();

// 設定資料庫
setDatabase();

// 初始化框架
const app = Express();

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

/**
 * 建立全域的系統相關路徑變數
 *
 * @returns {void}
 */
function setGlobalPath(): void {
    // 取得路徑，該機制在專案結構發生變更時，需視情況進行調整
    global.appPath = __dirname; // 取得app.js(ts)路徑
    global.basePath = Path.join(global.appPath, ".."); // 取得專案路徑
    global.storagePath = Path.join(global.basePath, "storage"); // storage路徑
    global.publicPath = Path.join(global.basePath, "public"); // public路徑
}

/**
 * 建立檔案系統相關路徑
 *
 * @returns {void}
 */
function setFilePath(): void {
    // 建立公開檔案的上傳資料夾
    const storagePublicPath: string = `${global.storagePath}/public`;

    if (FS.existsSync(storagePublicPath) === false) {
        try {
            FS.mkdirSync(storagePublicPath, { recursive: true });
            console.log("成功建立公開檔案上傳資料夾");
        } catch (error: any) {
            console.log("建立公開檔案上傳資料夾異常");
        }
    }

    // 建立符號連結
    const publicStoragePath: string = `${global.publicPath}/storage`;

    if (FS.existsSync(publicStoragePath) === false) {
        try {
            FS.symlinkSync(storagePublicPath, publicStoragePath, "dir");
            console.log("成功建立符號連結");
        } catch (error: any) {
            console.log("建立符號連結異常");
        }
    }
}

/**
 * 設定資料庫
 *
 * @returns {void}
 */
function setDatabase(): void {
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
}
