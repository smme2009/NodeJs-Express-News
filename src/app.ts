import Express from "express";
import Path from "path";
import FS from "fs";
import BodyParser from "body-parser";
import Env from "dotenv";
import RtBackend from "@/router/backend/index";
import RtFrontend from "@/router/frontend/index";
import Database from "@/database/database";

// 初始化env
Env.config();

// 建立全域的系統相關路徑變數
setGlobalPath();

// 建立檔案資料夾的符號連結
setFileLink();

// 初始化資料庫
Database.getInstance();

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

const port: number = parseInt(process.env.APP_PORT);

// 開始監聽
app.listen(port, () => {
    console.log(`已開始監聽${port}Port`);
});

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
 * 建立檔案資料夾的符號連結
 *
 * @returns {void}
 */
function setFileLink(): void {
    // 上傳資料夾
    const uploadPath: string = `${global.storagePath}/public`;

    // 公開資料夾
    const publicPath: string = `${global.publicPath}/storage`;

    if (FS.existsSync(publicPath) === false) {
        try {
            FS.symlinkSync(uploadPath, publicPath, "dir");
            console.log("成功建立符號連結");
        } catch (error: any) {
            console.log("建立符號連結異常");
        }
    }
}
