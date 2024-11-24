import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeNewsType from "@/type/data/newsType";
import TypePage from "@/type/data/page";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";
import SrcNewsType from "@/service/mgmt/news/type";

// 新聞類型
export default class Admin extends Controller {
    // 框架Request
    private request: Request;

    // 框架Response
    private response: Response;

    // 新聞類型Service
    private srcNewsType: SrcNewsType;

    /**
     * 建構子
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     */
    constructor(request: Request, response: Response) {
        super();

        this.request = request;
        this.response = response;

        this.srcNewsType = new SrcNewsType();
    }

    /**
     * 取得新聞類型
     *
     * @returns {Promise<void>}
     */
    public async get(): Promise<void> {
        const newsTypeId: string = this.request.params.newsTypeId;

        const data: null | TypeNewsType = await this.srcNewsType.get(
            parseInt(newsTypeId)
        );

        if (data === null) {
            const json: TypeJson = this.getJson("查無此新聞類型");
            this.response.status(404).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功取得新聞類型", data);
        this.response.status(200).json(json);
        return;
    }

    /**
     * 取得新聞類型分頁
     *
     * @returns {Promise<void>}
     */
    public async getPage(): Promise<void> {
        const pageNumber: number = parseInt(
            (this.request.query.pageNumber as string) ?? 1
        );

        const data: TypePage<TypeNewsType> = await this.srcNewsType.getPage(
            pageNumber
        );

        const json: TypeJson = this.getJson("成功取得新聞類型分頁", data);
        this.response.status(200).json(json);
        return;
    }

    /**
     * 新增新聞類型
     *
     * @returns {Promise<void>}
     */
    public async insert(): Promise<void> {
        const request: TypeNewsType = this.getRequest();
        const error: Result = validationResult(this.request);

        // 欄位驗證錯誤回傳
        if (error.isEmpty() === false) {
            const json: TypeJson = this.getJson("欄位錯誤", error.array());
            this.response.status(400).json(json);
            return;
        }

        // 檢查名稱是否可用
        const isPass: boolean = await this.srcNewsType.checkName(request.name);

        if (isPass === false) {
            const json: TypeJson = this.getJson("名稱重複");
            this.response.status(400).json(json);
            return;
        }

        // 新增新聞類型
        const data: null | TypeNewsType = await this.srcNewsType.insert(
            request
        );

        if (data === null) {
            const json: TypeJson = this.getJson("新增新聞類型失敗");
            this.response.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功新增新聞類型", data);
        this.response.status(201).json(json);
        return;
    }

    /**
     * 更新新聞類型
     *
     * @returns {Promise<void>}
     */
    public async update(): Promise<void> {
        const newsTypeId: string = this.request.params.newsTypeId;
        const request: TypeNewsType = this.getRequest();
        const error: Result = validationResult(this.request);

        // 欄位驗證錯誤回傳
        if (error.isEmpty() === false) {
            const json: TypeJson = this.getJson("欄位錯誤", error.array());
            this.response.status(400).json(json);
            return;
        }

        // 檢查名稱是否可用
        const isPass: boolean = await this.srcNewsType.checkName(
            request.name,
            parseInt(newsTypeId)
        );

        if (isPass === false) {
            const json: TypeJson = this.getJson("名稱重複");
            this.response.status(400).json(json);
            return;
        }

        // 更新新聞類型
        const data: null | TypeNewsType = await this.srcNewsType.update(
            parseInt(newsTypeId),
            request
        );

        if (data === null) {
            const json: TypeJson = this.getJson("更新新聞類型失敗");
            this.response.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功更新新聞類型", data);
        this.response.status(200).json(json);
        return;
    }

    /**
     * 刪除新聞類型
     *
     * @returns {Promise<void>}
     */
    public async delete(): Promise<void> {
        const newsTypeId: string = this.request.params.newsTypeId;

        const isDelete: boolean = await this.srcNewsType.delete(
            parseInt(newsTypeId)
        );

        if (isDelete === false) {
            const json: TypeJson = this.getJson("刪除新聞類型失敗");
            this.response.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功刪除新聞類型");
        this.response.status(200).json(json);
        return;
    }

    /**
     * 取得Request
     *
     * @returns {TypeNewsType} Request
     */
    private getRequest(): TypeNewsType {
        const request: TypeNewsType = {
            name: this.request.body.name,
            status: this.request.body.status,
        };

        return request;
    }
}
