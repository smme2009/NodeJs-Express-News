import TypeJson from "@/type/system/json";
import { Request } from "express";

// Controller
export default class Controller {
    /**
     * 取得Response用JSON
     *
     * @param {string} message 訊息
     * @param {object} data 資料
     *
     * @returns {TypeJson} JSON
     */
    protected getJson(message: string, data: object = {}): TypeJson {
        const json: TypeJson = {
            message: message,
            data: data,
        };

        return json;
    }

    /**
     * 取得頁碼
     *
     * @param {Request} request 框架Request
     *
     * @returns {number} 頁碼
     */
    protected getPageNumber(request: Request): number {
        // 取得頁碼，若沒有則預設第1頁
        const sPageNumber: string = (request.query.pageNumber as string) ?? "1";

        let pageNumber: number = parseInt(sPageNumber);

        // 輸入頁碼小於1時，預設第1頁
        pageNumber = pageNumber < 1 ? 1 : pageNumber;

        return pageNumber;
    }
}
