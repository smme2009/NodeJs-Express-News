import { Router, Request, Response } from "express";
import CtrlProdoct from "@/controller/shop/product/product";

const router: Router = Router();

// 商品列表
router.get("/product", async (eRequest: Request, eResponse: Response) => {
    const ctrlProdoct: CtrlProdoct = new CtrlProdoct();
    await ctrlProdoct.getPage(eRequest, eResponse);
});

export default router;
