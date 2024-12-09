import { Router, Request, Response, NextFunction } from "express";
import MwFile from "@/middleware/file";
import CtrlNewsFile from "@/controller/news/file";

const router: Router = Router();
const url: string = "/news/file";

// 檔案上傳
router.post(
    url,
    (eRequest: Request, eResponse: Response, eNext: NextFunction) => {
        new MwFile().handle(eRequest, eResponse, eNext);
    },
    (eRequest: Request, eResponse: Response) => {
        new CtrlNewsFile(eRequest, eResponse).save();
    }
);

export default router;
