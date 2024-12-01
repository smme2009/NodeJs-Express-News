import { Router, Request, Response } from "express";
import CtrlNewsType from "@/controller/news/type";

const router: Router = Router();
const url: string = "/news/type";
const hasCondition: boolean = true;
const urlWithId: string = url + "/:newsTypeId";

// 取得新聞類型
router.get(urlWithId, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType(eRequest, eResponse).get(hasCondition);
});

// 取得新聞類型分頁
router.get(url, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType(eRequest, eResponse).getPage(hasCondition);
});

export default router;
