import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeFile from "@/type/data/file";
import { Request, Response } from "express";
import SrcNewsFile from "@/service/news/file";

// 新聞檔案
export default class File extends Controller {
    // 新聞檔案Service
    private srcNewsFile: SrcNewsFile;

    /**
     * 建構子
     */
    constructor() {
        super();
        this.srcNewsFile = new SrcNewsFile();
    }

    /**
     * 新增新聞檔案
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     *
     * @returns {Promise<Response>}
     */
    public async save(request: Request, response: Response): Promise<Response> {
        const fileInfo: TypeFile = this.getFileInfo(request);

        // 檢查檔案
        const errorList: null | string[] = this.srcNewsFile.checkFile(fileInfo);

        if (errorList !== null) {
            const json: TypeJson = this.getJson("檔案格式錯誤", errorList);
            return response.status(400).json(json);
        }

        // 新增新聞檔案
        const data: null | TypeFile = await this.srcNewsFile.save(fileInfo);

        if (data === null) {
            const json: TypeJson = this.getJson("新增新聞檔案失敗");
            return response.status(400).json(json);
        }

        const json: TypeJson = this.getJson("成功新增新聞檔案", data);
        return response.status(201).json(json);
    }

    /**
     * 取得檔案資訊
     *
     * @param {Request} request 框架Request
     *
     * @returns {TypeFile} 檔案資訊
     */
    private getFileInfo(request: Request): TypeFile {
        const file: Express.Multer.File = request.file!;

        const fileInfo: TypeFile = {
            name: file.originalname,
            hashName: file.filename,
            path: file.path,
            format: file.mimetype,
            size: file.size,
        };

        return fileInfo;
    }
}
