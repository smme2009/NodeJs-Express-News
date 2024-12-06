import TypeConfig from "@/type/system/config";
import TypeJson from "@/type/system/json";
import Multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import Crypto from "crypto";
import Path from "path";
import FS from "fs";
import ConfigFile from "@/config/file";

// 檔案
export default class file {
    /**
     * 中介層處理
     *
     * @returns {RequestHandler}
     */
    public handle(
        eRequest: Request,
        eResponse: Response,
        eNext: NextFunction
    ): void {
        const type: string = eRequest.params.type;
        const configFile: TypeConfig = ConfigFile[type];

        // 檢查上傳類型
        if (configFile === undefined) {
            const json: TypeJson = {
                message: "上傳類型錯誤",
            };

            eResponse.status(400).json(json);
            return;
        }

        // 設定套件
        const multer: Multer.Multer = Multer({
            storage: Multer.diskStorage({
                // 檔案路徑
                destination: (
                    eRequest: Request,
                    file: Express.Multer.File,
                    callback
                ) => {
                    const fullPath: string = this.getFullPath(configFile.path);
                    callback(null, fullPath);
                },
                // 檔案名稱
                filename: (
                    eRequest: Request,
                    file: Express.Multer.File,
                    callback
                ) => {
                    callback(null, this.getFileHashName(file.originalname));
                },
            }),
            // 檔案大小
            limits: {
                fileSize: 100000 * configFile.size,
            },
            // 檔案格式
            fileFilter: (
                eRequest: Request,
                file: Express.Multer.File,
                callback: FileFilterCallback
            ) => {
                const isPass: boolean = this.checkExtension(
                    file.originalname,
                    configFile.format
                );

                isPass === true
                    ? callback(null, true)
                    : callback(new Error("檔案格式錯誤"));
            },
        });

        // 執行套件
        multer.single("file")(eRequest, eResponse, eNext);
    }

    /**
     * 取得完整路徑
     *
     * @param {string} path 相對路徑
     *
     * @returns {string} 完整路徑
     */
    private getFullPath(path: string): string {
        const fullPath = Path.join(".", path);

        // 查無此路徑時建立路徑
        if (FS.existsSync(fullPath) === false) {
            FS.mkdirSync(fullPath, { recursive: true });
        }

        return fullPath;
    }

    /**
     * 取得檔案雜湊名稱
     *
     * @param {string} fileName 檔案名稱
     *
     * @returns {string} 檔案雜湊名稱
     */
    private getFileHashName(fileName: string): string {
        const date: number = Date.now();
        const rand: number = Math.random();
        const extension: string = Path.extname(fileName);

        // 產生雜湊
        const hash: string = Crypto.createHash("sha256")
            .update(`${fileName}${date.toString()}${rand}`)
            .digest("hex");

        return `${hash}${extension}`;
    }

    /**
     * 檢查檔案副檔名
     *
     * @param {string} fileName 檔案名稱
     * @param {string[]} formatList 格式列表
     *
     * @returns {boolean} 是否通過
     */
    private checkExtension(fileName: string, formatList: string[]): boolean {
        const extension: string = Path.extname(fileName).substring(1);

        return formatList.includes(extension);
    }
}
