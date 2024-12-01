import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";
import ConfigRole from "@/config/role";

const router: Router = Router();
const roleId: number = ConfigRole.admin as number;

// 登入
router.post("/login", (eRequest: Request, eResponse: Response) => {
    new CtrlAccount(eRequest, eResponse, roleId).login();
});

export default router;
