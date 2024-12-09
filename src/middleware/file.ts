import Multer from "multer";
import { Request, Response, NextFunction } from "express";
import Crypto from "crypto";
import Path from "path";
import OS from "os";

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
        // 設定套件
        const multer: Multer.Multer = Multer({
            storage: Multer.diskStorage({
                // 檔案路徑
                destination: (
                    eRequest: Request,
                    file: Express.Multer.File,
                    callback
                ) => {
                    callback(null, OS.tmpdir());
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
                fileSize: 20000000,
            },
        });

        // 執行套件
        multer.single("file")(eRequest, eResponse, eNext);
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
}
