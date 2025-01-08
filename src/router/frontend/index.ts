import { Router } from "express";
import RtNews from "@/router/frontend/news/type";

// 路由
const router: Router = Router();

// 路徑
const url: string = "/api/frontend";

// 新聞類型
router.use(url, RtNews);

export default router;
