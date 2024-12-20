import { Router, Request, Response, NextFunction } from "express";
import MwFile from "@/middleware/file";
import CtrlNewsFile from "@/controller/news/file";

const router: Router = Router();
const url: string = "/news/file";

// 檔案上傳
router.post(
    url,
    (request: Request, response: Response, next: NextFunction) => {
        new MwFile().handle(request, response, next);
    },
    (request: Request, response: Response) => {
        new CtrlNewsFile().save(request, response);
    }
);

export default router;
