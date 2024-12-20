import { Router, Request, Response } from "express";
import CtrlNewsType from "@/controller/news/type";

const router: Router = Router();
const url: string = "/news/type";
const hasCondition: boolean = true;
const urlWithId: string = `${url}/:newsTypeId`;

// 取得新聞類型列表
router.get(`${url}/all`, (request: Request, response: Response) => {
    new CtrlNewsType().getAll(request, response, hasCondition);
});

// 取得新聞類型
router.get(urlWithId, (request: Request, response: Response) => {
    new CtrlNewsType().get(request, response, hasCondition);
});

// 取得新聞類型分頁
router.get(url, (request: Request, response: Response) => {
    new CtrlNewsType().getPage(request, response, hasCondition);
});

export default router;
