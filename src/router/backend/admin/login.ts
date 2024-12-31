import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";
import ConfigRole from "@/config/role";

// 路由
const router: Router = Router();

// 帳號Controller
const ctrlAccount: CtrlAccount = new CtrlAccount();

// 登入
router.post("/login", (request: Request, response: Response) => {
    ctrlAccount.login(request, response, ConfigRole.admin);
});

export default router;
