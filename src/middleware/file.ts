import Multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import Crypto from "crypto";
import Path from "path";
import FS from "fs";

// 檔案
export default class file {
    // 可通過格式，這邊先設定一個整體，詳細的檢查交由service
    private format: string[] = ["jpeg", "png", "gif"];

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
        // 設定套件
        const multer: Multer.Multer = Multer({
            storage: Multer.diskStorage({
                // 檔案路徑
                destination: (
                    eRequest: Request,
                    file: Express.Multer.File,
                    callback
                ) => {
                    callback(null, this.getPath());
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
                fileSize: 2000000,
            },
            // 檔案格式
            fileFilter: (
                eRequest: Request,
                file: Express.Multer.File,
                callback: FileFilterCallback
            ) => {
                const isPass: boolean = this.checkExtension(
                    file.originalname,
                    this.format
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
     * 取得路徑
     *
     * @returns {string} 路徑
     */
    private getPath(): string {
        const path: string = "./storage/upload/temp";

        // 查無此路徑時建立路徑
        if (FS.existsSync(path) === false) {
            FS.mkdirSync(path, { recursive: true });
        }

        return path;
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
