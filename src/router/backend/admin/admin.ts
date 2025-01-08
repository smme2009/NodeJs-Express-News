import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";

// 路由
const router: Router = Router();

// 帳號Controller
const ctrlAccount: CtrlAccount = new CtrlAccount();

// 帳號資訊
router.get("/admin/info", (request: Request, response: Response) => {
    ctrlAccount.getInfo(request, response);
});

// 登出
router.post("/logout", (request: Request, response: Response) => {
    ctrlAccount.logout(request, response);
});

export default router;
