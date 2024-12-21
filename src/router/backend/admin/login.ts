import { Router, Request, Response } from "express";
import CtrlAccount from "@/controller/account/account";
import ConfigRole from "@/config/role";

const router: Router = Router();

// 登入
router.post("/login", (request: Request, response: Response) => {
    new CtrlAccount().login(request, response, ConfigRole.admin);
});

export default router;
