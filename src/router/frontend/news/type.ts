import { Router, Request, Response } from "express";
import CtrlNewsType from "@/controller/news/type";

// 路由
const router: Router = Router();

// 新聞類型Controller
const ctrlNewsType: CtrlNewsType = new CtrlNewsType();

// 路徑
const url: string = "/news/type";

// 路徑(含ID)
const urlWithId: string = `${url}/:newsTypeId`;

// 查詢是否需要額外條件
const hasCondition: boolean = true;

// 取得新聞類型列表
router.get(`${url}/all`, (request: Request, response: Response) => {
    ctrlNewsType.getAll(request, response, hasCondition);
});

// 取得新聞類型
router.get(urlWithId, (request: Request, response: Response) => {
    ctrlNewsType.get(request, response, hasCondition);
});

// 取得新聞類型分頁
router.get(url, (request: Request, response: Response) => {
    ctrlNewsType.getPage(request, response, hasCondition);
});

export default router;
