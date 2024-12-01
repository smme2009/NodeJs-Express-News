import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";
import ConfigRole from "@/config/role";

const router: Router = Router();
const roleId: number = ConfigRole.admin as number;

// 帳號資訊
router.get("/admin/info", (eRequest: Request, eResponse: Response) => {
    new CtrlAccount(eRequest, eResponse, roleId).getInfo();
});

// 登出
router.post("/logout", (eRequest: Request, eResponse: Response) => {
    new CtrlAccount(eRequest, eResponse, roleId).logout();
});

export default router;
