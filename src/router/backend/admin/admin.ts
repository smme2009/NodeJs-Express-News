import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";

const router: Router = Router();

// 帳號資訊
router.get("/admin/info", (request: Request, response: Response) => {
    new CtrlAccount().getInfo(request, response);
});

// 登出
router.post("/logout", (request: Request, response: Response) => {
    new CtrlAccount().logout(request, response);
});

export default router;
