import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeNewsType from "@/type/data/newsType";
import TypePage from "@/type/data/page";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";
import SrcNewsType from "@/service/news/type";

// 新聞類型
export default class Admin extends Controller {
    /**
     * 建構子
     */
    constructor(
        // 新聞類型Service
        private srcNewsType: SrcNewsType = new SrcNewsType()
    ) {
        super();
    }

    /**
     * 取得新聞類型
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<Response>}
     */
    public async get(
        request: Request,
        response: Response,
        hasCondition: boolean
    ): Promise<Response> {
        const newsTypeId: string = request.params.newsTypeId;

        const data: null | TypeNewsType = await this.srcNewsType.get(
            parseInt(newsTypeId),
            hasCondition
        );

        if (data === null) {
            const json: TypeJson = this.getJson("查無此新聞類型");
            return response.status(404).json(json);
        }

        const json: TypeJson = this.getJson("成功取得新聞類型", data);
        return response.status(200).json(json);
    }

    /**
     * 取得新聞類型分頁
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<Response>}
     */
    public async getPage(
        request: Request,
        response: Response,
        hasCondition: boolean
    ): Promise<Response> {
        const pageNumber: number = this.getPageNumber(request);

        const data: TypePage<TypeNewsType> = await this.srcNewsType.getPage(
            pageNumber,
            hasCondition
        );

        const json: TypeJson = this.getJson("成功取得新聞類型分頁", data);
        return response.status(200).json(json);
    }

    /**
     * 取得所有新聞類型
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<Response>}
     */
    public async getAll(
        request: Request,
        response: Response,
        hasCondition: boolean
    ): Promise<Response> {
        const data: TypeNewsType[] = await this.srcNewsType.getAll(
            hasCondition
        );

        const json: TypeJson = this.getJson("成功取得所有新聞類型", data);
        return response.status(200).json(json);
    }

    /**
     * 新增新聞類型
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     *
     * @returns {Promise<Response>}
     */
    public async insert(
        request: Request,
        response: Response
    ): Promise<Response> {
        const requestData: TypeNewsType = this.getRequestData(request);
        const error: Result = validationResult(request);

        // 欄位驗證錯誤回傳
        if (error.isEmpty() === false) {
            const json: TypeJson = this.getJson("欄位錯誤", error.array());
            return response.status(400).json(json);
        }

        // 檢查名稱是否可用
        const isPass: boolean = await this.srcNewsType.checkName(
            requestData.name
        );

        if (isPass === false) {
            const json: TypeJson = this.getJson("名稱重複");
            return response.status(400).json(json);
        }

        // 新增新聞類型
        const data: null | TypeNewsType = await this.srcNewsType.insert(
            requestData
        );

        if (data === null) {
            const json: TypeJson = this.getJson("新增新聞類型失敗");
            return response.status(400).json(json);
        }

        const json: TypeJson = this.getJson("成功新增新聞類型", data);
        return response.status(201).json(json);
    }

    /**
     * 更新新聞類型
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     *
     * @returns {Promise<Response>}
     */
    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const newsTypeId: string = request.params.newsTypeId;
        const requestData: TypeNewsType = this.getRequestData(request);
        const error: Result = validationResult(request);

        // 欄位驗證錯誤回傳
        if (error.isEmpty() === false) {
            const json: TypeJson = this.getJson("欄位錯誤", error.array());
            return response.status(400).json(json);
        }

        // 檢查名稱是否可用
        const isPass: boolean = await this.srcNewsType.checkName(
            requestData.name,
            parseInt(newsTypeId)
        );

        if (isPass === false) {
            const json: TypeJson = this.getJson("名稱重複");
            return response.status(400).json(json);
        }

        // 更新新聞類型
        const data: null | TypeNewsType = await this.srcNewsType.update(
            parseInt(newsTypeId),
            requestData
        );

        if (data === null) {
            const json: TypeJson = this.getJson("更新新聞類型失敗");
            return response.status(400).json(json);
        }

        const json: TypeJson = this.getJson("成功更新新聞類型", data);
        return response.status(200).json(json);
    }

    /**
     * 刪除新聞類型
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     *
     * @returns {Promise<Response>}
     */
    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const newsTypeId: string = request.params.newsTypeId;

        const isDelete: boolean = await this.srcNewsType.delete(
            parseInt(newsTypeId)
        );

        if (isDelete === false) {
            const json: TypeJson = this.getJson("刪除新聞類型失敗");
            return response.status(400).json(json);
        }

        const json: TypeJson = this.getJson("成功刪除新聞類型");
        return response.status(200).json(json);
    }

    /**
     * 取得Request資料
     *
     * @param {Request} request 框架Request
     *
     * @returns {TypeNewsType} Request資料
     */
    private getRequestData(request: Request): TypeNewsType {
        const requestData: TypeNewsType = {
            name: request.body.name,
            status: request.body.status,
        };

        return requestData;
    }
}
