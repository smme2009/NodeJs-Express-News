import { Router, Request, Response, NextFunction } from "express";
import MwFile from "@/middleware/file";
import CtrlNewsFile from "@/controller/news/file";

// 路由
const router: Router = Router();

// 檔案上傳中介層
const mwFile: MwFile = new MwFile();

// 新聞檔案Controller
const ctrlNewsFile: CtrlNewsFile = new CtrlNewsFile();

// 路徑
const url: string = "/news/file";

// 檔案上傳
router.post(
    url,
    (request: Request, response: Response, next: NextFunction) => {
        mwFile.handle(request, response, next);
    },
    (request: Request, response: Response) => {
        ctrlNewsFile.save(request, response);
    }
);

export default router;
