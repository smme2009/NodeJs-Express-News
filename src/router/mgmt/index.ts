import { Router, Request, Response, NextFunction } from "express";
import MwAccount from "@/middleware/account";
import RtLogin from "@/router/mgmt/admin/login";
import RtAdmin from "@/router/mgmt/admin/admin";
import RtNews from "@/router/mgmt/news/type";

const router: Router = Router();
const url: string = "/api/mgmt";
const mvAccount: MwAccount = new MwAccount();

// 登入
router.use(url, RtLogin);

// 驗證登入中介層
router.use(
    url,
    (eRequest: Request, eResponse: Response, eNext: NextFunction) => {
        mvAccount.handle(eRequest, eResponse, eNext);
    }
);

// 管理者
router.use(url, RtAdmin);

// 新聞類型
router.use(url, RtNews);

export default router;
