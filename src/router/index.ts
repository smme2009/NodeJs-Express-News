import { Router } from "express";
import rtProduct from "@/router/shop/product";

const router: Router = Router();

router.use("/api/shop", rtProduct);

export default router;
