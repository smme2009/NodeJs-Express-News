import TypeJson from "@/type/system/json";
import { Request, Response } from "express";

// Controller
export default class Controller {
    // 框架Request
    protected request: Request;

    // 框架Response
    protected response: Response;

    /**
     * 建構子
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     */
    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

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
     * @returns {number} 頁碼
     */
    protected getPageNumber(): number {
        // 取得頁碼，若沒有則預設第1頁
        const sPageNumber: string =
            (this.request.query.pageNumber as string) ?? "1";

        let pageNumber: number = parseInt(sPageNumber);

        // 輸入頁碼小於1時，預設第1頁
        pageNumber = pageNumber < 1 ? 1 : pageNumber;

        return pageNumber;
    }
}
