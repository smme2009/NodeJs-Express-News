import { Router, Request, Response } from "express";
import CtrlAdmin from "@/controller/mgmt/admin/admin";

const router: Router = Router();

// 登入
router.post("/login", async (eRequest: Request, eResponse: Response) => {
    const ctrlAdmin: CtrlAdmin = new CtrlAdmin();
    await ctrlAdmin.login(eRequest, eResponse);
});

export default router;
