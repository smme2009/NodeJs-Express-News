import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";
import ConfigRole from "@/config/role";

const router: Router = Router();
const roleId: number = ConfigRole.admin as number;

// 登入
router.post("/login", (request: Request, response: Response) => {
    new CtrlAccount(roleId).login(request, response);
});

export default router;
