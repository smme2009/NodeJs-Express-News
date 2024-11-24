import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeNewsType from "@/type/data/newsType";
import TypePage from "@/type/data/page";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";
import SrcNewsType from "@/service/mgmt/news/type";

// 新聞類型
export default class Admin extends Controller {
    private srcNewsType: SrcNewsType;

    constructor() {
        super();

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
            const json: TypeJson = this.getJson("查無此新聞類型");
            eResponse.status(404).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功取得新聞類型", data);
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

        const data: TypePage<TypeNewsType> = await this.srcNewsType.getPage(
            pageNumber
        );

        const json: TypeJson = this.getJson("成功取得新聞類型分頁", data);
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
            const json: TypeJson = this.getJson("欄位錯誤", error.array());
            eResponse.status(400).json(json);
            return;
        }

        // 檢查名稱是否可用
        const isPass: boolean = await this.srcNewsType.checkName(request.name);

        if (isPass === false) {
            const json: TypeJson = this.getJson("名稱重複");
            eResponse.status(400).json(json);
            return;
        }

        // 新增新聞類型
        const data: null | TypeNewsType = await this.srcNewsType.insert(
            request
        );

        if (data === null) {
            const json: TypeJson = this.getJson("新增新聞類型失敗");
            eResponse.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功新增新聞類型", data);
        eResponse.status(201).json(json);
        return;
    }

    /**
     * 更新新聞類型
     *
     * @param {Request} eRequest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Promise<void>}
     */
    public async update(eRequest: Request, eResponse: Response): Promise<void> {
        const newsTypeId: string = eRequest.params.newsTypeId;
        const request: TypeNewsType = this.getRequest(eRequest);
        const error: Result = validationResult(eRequest);

        // 欄位驗證錯誤回傳
        if (error.isEmpty() === false) {
            const json: TypeJson = this.getJson("欄位錯誤", error.array());
            eResponse.status(400).json(json);
            return;
        }

        // 檢查名稱是否可用
        const isPass: boolean = await this.srcNewsType.checkName(
            request.name,
            parseInt(newsTypeId)
        );

        if (isPass === false) {
            const json: TypeJson = this.getJson("名稱重複");
            eResponse.status(400).json(json);
            return;
        }

        // 更新新聞類型
        const data: null | TypeNewsType = await this.srcNewsType.update(
            parseInt(newsTypeId),
            request
        );

        if (data === null) {
            const json: TypeJson = this.getJson("更新新聞類型失敗");
            eResponse.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功更新新聞類型", data);
        eResponse.status(200).json(json);
        return;
    }

    /**
     * 刪除新聞類型
     *
     * @param {Request} eRequest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Promise<void>}
     */
    public async delete(eRequest: Request, eResponse: Response): Promise<void> {
        const newsTypeId: string = eRequest.params.newsTypeId;

        const isDelete: boolean = await this.srcNewsType.delete(
            parseInt(newsTypeId)
        );

        if (isDelete === false) {
            const json: TypeJson = this.getJson("刪除新聞類型失敗");
            eResponse.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功刪除新聞類型");
        eResponse.status(200).json(json);
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
