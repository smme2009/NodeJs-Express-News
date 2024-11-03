import { Request, Response } from "express";
import ISearch from "@/type/request/shop/product/search";
import IErrorMessage from "@/type/system/errorMessage";
import IPage from "@/type/system/page";
import ValSearch from "@/validator/shop/product/search";
import SrcProduct from "@/service/shop/product/product";

// 商品
export default class Product {
    private valSearch: ValSearch;
    private srcProduct: SrcProduct;

    constructor() {
        this.valSearch = new ValSearch();
        this.srcProduct = new SrcProduct();
    }

    /**
     * 取得分頁
     *
     * @param {Request} eRequrest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Response}
     */
    public async getPage(
        eRequrest: Request,
        eResponse: Response
    ): Promise<Response> {
        // 驗證欄位
        const errorList: IErrorMessage[] = await this.valSearch.validate(
            eRequrest
        );

        if (errorList.length !== 0) {
            const response: Response = eResponse.status(400).json({
                message: "欄位驗證錯誤",
                data: errorList,
            });

            return response;
        }

        // 取得搜尋資料
        const searchData: ISearch = this.getSearchData(eRequrest);
        const pageNumber: number = parseInt(eRequrest.query.page as string);

        // 取得分頁資料
        const srcPage: IPage = await this.srcProduct.getPage(
            pageNumber,
            searchData
        );

        const response: Response = eResponse.status(200).json({
            message: "成功取得商品分頁",
            data: srcPage,
        });

        return response;
    }

    /**
     * 取得搜尋資料
     *
     * @param {Request} request 框架Request
     *
     * @returns {ISearch}
     */
    private getSearchData(eRequest: Request): ISearch {
        const searchData: ISearch = {
            keyword: (eRequest.query.keyword as string) ?? "",
            productTypeId: (eRequest.query.productTypeId as string) ?? "",
        };

        return searchData;
    }
}
