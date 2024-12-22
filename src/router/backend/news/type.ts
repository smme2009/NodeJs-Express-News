import { Router, Request, Response } from "express";
import ValNewsType from "@/validation/news/type";
import CtrlNewsType from "@/controller/news/type";

const router: Router = Router();
const url: string = "/news/type";
const hasCondition: boolean = false;
const urlWithId: string = `${url}/:newsTypeId`;

// 取得新聞類型
router.get(urlWithId, (request: Request, response: Response) => {
    new CtrlNewsType().get(request, response, hasCondition);
});

// 取得新聞類型分頁
router.get(url, (request: Request, response: Response) => {
    new CtrlNewsType().getPage(request, response, hasCondition);
});

// 新增新聞類型
router.post(url, ValNewsType, (request: Request, response: Response) => {
    new CtrlNewsType().insert(request, response);
});

// 更新新聞類型
router.put(urlWithId, ValNewsType, (request: Request, response: Response) => {
    new CtrlNewsType().update(request, response);
});

// 刪除新聞類型
router.delete(urlWithId, (request: Request, response: Response) => {
    new CtrlNewsType().delete(request, response);
});

export default router;
