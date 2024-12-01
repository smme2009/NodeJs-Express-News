import { Router, Request, Response, NextFunction } from "express";
import MwAccount from "@/middleware/account";
import RtLogin from "@/router/backend/admin/login";
import RtAdmin from "@/router/backend/admin/admin";
import RtNews from "@/router/backend/news/type";
import ConfigRole from "@/config/role";

const router: Router = Router();
const url: string = "/api/backend";
const roleId: number = ConfigRole.admin as number;
const mwAccount: MwAccount = new MwAccount(roleId);

// 登入
router.use(url, RtLogin);

// 驗證登入中介層
router.use(
    url,
    (eRequest: Request, eResponse: Response, eNext: NextFunction) => {
        mwAccount.handle(eRequest, eResponse, eNext);
    }
);

// 管理者
router.use(url, RtAdmin);

// 新聞類型
router.use(url, RtNews);

export default router;
