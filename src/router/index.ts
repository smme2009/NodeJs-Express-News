import { Router } from "express";
import RtLogin from "@/router/mgmt/login";

const router: Router = Router();

router.use("/api/mgmt", RtLogin);

export default router;
