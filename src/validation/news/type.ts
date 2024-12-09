import { check, ValidationChain } from "express-validator";

const checkList: ValidationChain[] = [
    check("name").notEmpty().withMessage("名稱 必填"),
    check("status").notEmpty().withMessage("狀態 必填"),
    check("status").isBoolean().withMessage("狀態 必須是布林值"),
];

export default checkList;
