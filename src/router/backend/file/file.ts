import { Router, Request, Response, NextFunction } from "express";
import MwFile from "@/middleware/file";
import CtrlFile from "@/controller/file/file";

const router: Router = Router();
const url: string = "/file";

// 檔案上傳
router.post(
    `${url}/:type`,
    (eRequest: Request, eResponse: Response, eNext: NextFunction) => {
        new MwFile().handle(eRequest, eResponse, eNext);
    },
    (eRequest: Request, eResponse: Response) => {
        new CtrlFile(eRequest, eResponse).insert();
    }
);

export default router;
