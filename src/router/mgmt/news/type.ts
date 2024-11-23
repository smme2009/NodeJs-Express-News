import { Router, Request, Response } from "express";
import ValNewsType from "@/validation/mgmt/news/type";
import CtrlNewsType from "@/controller/mgmt/news/type";

const router: Router = Router();
const url: string = "/news/type";

// 取得新聞類型
router.get(url + "/:newsTypeId", (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType().get(eRequest, eResponse);
});

// 取得新聞類型分頁
router.get(url, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType().getPage(eRequest, eResponse);
});

// 新增新聞類型
router.post(url, ValNewsType, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType().insert(eRequest, eResponse);
});

// 更新新聞類型
router.put(
    url + "/:newsTypeId",
    ValNewsType,
    (eRequest: Request, eResponse: Response) => {
        new CtrlNewsType().update(eRequest, eResponse);
    }
);

export default router;
