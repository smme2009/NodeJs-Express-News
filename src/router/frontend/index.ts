import { Router } from "express";
import RtNews from "@/router/frontend/news/type";

const router: Router = Router();
const url: string = "/api/shop";

// 新聞類型
router.use(url, RtNews);

export default router;
