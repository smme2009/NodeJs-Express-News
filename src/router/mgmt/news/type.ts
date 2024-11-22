import { Router, Request, Response } from "express";
import ValNewsType from "@/validation/mgmt/news/type";
import CtrlNewsType from "@/controller/mgmt/news/type";

const router: Router = Router();
const url: string = "/news/type";

// 新增新聞類型
router.post(url, ValNewsType, (eRequest: Request, eResponse: Response) => {
    new CtrlNewsType().insert(eRequest, eResponse);
});

export default router;
