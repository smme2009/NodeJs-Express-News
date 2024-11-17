import { Router } from "express";
import rtProduct from "@/router/shop/product";
import RtLogin from "@/router/mgmt/login";

const router: Router = Router();

router.use("/api/shop", rtProduct);
router.use("/api/mgmt", RtLogin);

export default router;
