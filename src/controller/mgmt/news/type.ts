import TypeResponse from "@/type/system/response";
import TypeNewsType from "@/type/data/newsType";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";
import SrcNewsType from "@/service/mgmt/news/type";

// 新聞類型
export default class Admin {
    private srcNewsType: SrcNewsType;

    constructor() {
        this.srcNewsType = new SrcNewsType();
    }

    /**
     * 取得新聞類型
     *
     * @param {Request} eRequest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Promise<void>}
     */
    public async get(eRequest: Request, eResponse: Response): Promise<void> {
        const newsTypeId: string = eRequest.params.newsTypeId;

        const data: null | TypeNewsType = await this.srcNewsType.get(
            parseInt(newsTypeId)
        );

        if (data === null) {
            const json: TypeResponse = {
                message: "查無此新聞類型",
            };

            eResponse.status(404).json(json);
            return;
        }

        const json: TypeResponse = {
            message: "成功取得新聞類型",
            data: data,
        };

        eResponse.status(200).json(json);
        return;
    }

    /**
     * 取得新聞類型分頁
     *
     * @param {Request} eRequest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Promise<void>}
     */
    public async getPage(
        eRequest: Request,
        eResponse: Response
    ): Promise<void> {
        const pageNumber: number = parseInt(
            (eRequest.query.pageNumber as string) ?? 1
        );

        const json: TypeResponse = {
            message: "成功取得新聞類型分頁",
            data: await this.srcNewsType.getPage(pageNumber),
        };

        eResponse.status(200).json(json);
        return;
    }

    /**
     * 新增新聞類型
     *
     * @param {Request} eRequest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Promise<void>}
     */
    public async insert(eRequest: Request, eResponse: Response): Promise<void> {
        const request: TypeNewsType = this.getRequest(eRequest);
        const error: Result = validationResult(eRequest);

        // 欄位驗證錯誤回傳
        if (error.isEmpty() === false) {
            const json: TypeResponse = {
                message: "欄位錯誤",
                data: error.array(),
            };

            eResponse.status(400).json(json);
            return;
        }

        // 檢查名稱是否可用
        const isPass: boolean = await this.srcNewsType.checkName(request.name);

        if (isPass === false) {
            const json: TypeResponse = {
                message: "名稱重複",
            };

            eResponse.status(400).json(json);
            return;
        }

        // 新增新聞類型
        const data: null | TypeNewsType = await this.srcNewsType.insert(
            request
        );

        if (data === null) {
            const json: TypeResponse = {
                message: "新增新聞類型失敗",
            };

            eResponse.status(400).json(json);
            return;
        }

        const json: TypeResponse = {
            message: "成功新增新聞類型",
            data: data,
        };

        eResponse.status(201).json(json);
        return;
    }

    /**
     * 取得Request
     *
     * @param {Request} eRequest 框架Request
     *
     * @returns {TypeNewsType} Request
     */
    private getRequest(eRequest: Request): TypeNewsType {
        const request: TypeNewsType = {
            name: eRequest.body.name,
            status: eRequest.body.status,
        };

        return request;
    }
}
