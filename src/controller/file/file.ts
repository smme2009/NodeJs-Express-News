import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeFile from "@/type/data/file";
import { Request, Response } from "express";
import SrcFile from "@/service/file/file";

// 檔案
export default class File extends Controller {
    private srcFile: SrcFile;

    /**
     * 建構子
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     */
    constructor(request: Request, response: Response) {
        super(request, response);
        this.srcFile = new SrcFile();
    }

    /**
     * 新增檔案資料
     *
     * @returns {Promise<void>}
     */
    public async insert(): Promise<void> {
        const request: TypeFile = this.getRequest();

        // 新增檔案資料
        const data: null | TypeFile = await this.srcFile.insert(request);

        if (data === null) {
            const json: TypeJson = this.getJson("新增檔案失敗");
            this.response.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功新增檔案", data);
        this.response.status(201).json(json);
    }

    /**
     * 取得Request
     *
     * @returns {TypeFile} Request
     */
    private getRequest(): TypeFile {
        const file: Express.Multer.File = this.request.file!;

        const request: TypeFile = {
            name: file.originalname,
            hashName: file.filename,
            path: file.path,
            format: file.mimetype,
            size: file.size,
        };

        return request;
    }
}
