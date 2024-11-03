import { Request } from "express";

import {
    query,
    ValidationChain,
    validationResult,
    Result,
} from "express-validator";

import IErrorMessage from "@/type/system/errorMessage";

// 搜尋資料
export default class Search {
    // 條件
    private condition: ValidationChain[] = [
        query("keyword").optional().isString().withMessage("關鍵字 必須是字串"),
        query("productTypeId")
            .optional()
            .isString()
            .withMessage("商品類型ID 必須是數字"),
    ];

    /**
     * 驗證
     *
     * @param {Request} eRequest 框架Request
     *
     * @returns {Promise<IErrorMessage[]>}
     */
    public validate = async (eRequest: Request): Promise<IErrorMessage[]> => {
        // 驗證錯誤
        for (const item of this.condition) {
            await item.run(eRequest);
        }

        // 取得錯誤
        const result: Result = validationResult(eRequest);
        const errorList: IErrorMessage[] = [];

        if (result.isEmpty() === false) {
            for (const item of result.array()) {
                const errorMessage: IErrorMessage = {
                    name: item.path,
                    message: item.msg,
                };

                errorList.push(errorMessage);
            }
        }

        return errorList;
    };
}
