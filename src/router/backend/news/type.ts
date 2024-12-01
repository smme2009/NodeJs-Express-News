import { Router, Request, Response } from "express";
import ValNewsType from "@/validation/mgmt/news/type";
import CtrlNewsType from "@/controller/news/type";

const router: Router = Router();
const url: string = "/news/type";
const hasCondition: boolean = false;
const urlWithId: string = url + "/:newsTypeId";

// 取得新聞類型
router.get(urlWithId, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType(eRequest, eResponse).get(hasCondition);
});

// 取得新聞類型分頁
router.get(url, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType(eRequest, eResponse).getPage(hasCondition);
});

// 新增新聞類型
router.post(url, ValNewsType, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType(eRequest, eResponse).insert();
});

// 更新新聞類型
router.put(urlWithId, ValNewsType, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType(eRequest, eResponse).update();
});

// 刪除新聞類型
router.delete(urlWithId, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType(eRequest, eResponse).delete();
});

export default router;
