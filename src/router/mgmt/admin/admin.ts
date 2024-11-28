import { Router, Request, Response } from "express";
import CtrlAdmin from "@/controller/mgmt/admin/admin";

const router: Router = Router();

// 帳號資訊
router.get("/admin/info", (eRequest: Request, eResponse: Response) => {
    new CtrlAdmin(eRequest, eResponse).getInfo();
});

// 登出
router.post("/logout", (eRequest: Request, eResponse: Response) => {
    new CtrlAdmin(eRequest, eResponse).logout();
});

export default router;
