import { Router, Request, Response, NextFunction } from "express";
import MwAccount from "@/middleware/account";
import RtLogin from "@/router/backend/admin/login";
import RtAdmin from "@/router/backend/admin/admin";
import RtNewsFile from "@/router/backend/news/file";
import RtNewsType from "@/router/backend/news/type";
import ConfigRole from "@/config/role";

// 路由
const router: Router = Router();

// 路徑
const url: string = "/api/backend";

// 角色ID
const roleId: number = ConfigRole.admin as number;

// 帳號驗證中介層
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

// 新聞檔案
router.use(url, RtNewsFile);

// 新聞類型
router.use(url, RtNewsType);

export default router;
