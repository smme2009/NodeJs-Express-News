import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";
import ConfigRole from "@/config/role";

const router: Router = Router();
const roleId: number = ConfigRole.admin as number;

// 帳號資訊
router.get("/admin/info", (request: Request, response: Response) => {
    new CtrlAccount(roleId).getInfo(request, response);
});

// 登出
router.post("/logout", (request: Request, response: Response) => {
    new CtrlAccount(roleId).logout(request, response);
});

export default router;
