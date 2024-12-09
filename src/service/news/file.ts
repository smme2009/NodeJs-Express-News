import TypeFile from "@/type/data/file";
import RepoFile from "@/respository/file/file";
import ModelFile from "@/database/model/file";
import ToolFile from "@/tool/file";

// 新聞檔案
export default class File {
    // 檔案Respository
    private repoFile: RepoFile;

    // 檔案工具
    private toolFile: ToolFile;

    /**
     * 建構子
     */
    constructor() {
        this.repoFile = new RepoFile();
        this.toolFile = new ToolFile("news");
    }

    /**
     * 新增新聞檔案
     *
     * @param {TypeFile} data 資料
     *
     * @returns {Promise<null | TypeFile>} 資料
     */
    public async save(data: TypeFile): Promise<null | TypeFile> {
        // 儲存檔案
        const filePath: null | string = this.toolFile.save(data);

        if (filePath === null) {
            return null;
        }

        data.path = filePath;

        // 新增檔案資訊
        const model: null | ModelFile = await this.repoFile.insert(data);

        if (model === null) {
            return null;
        }

        return this.setData(model);
    }

    /**
     * 設定資料
     *
     * @param {ModelFile} model Model
     *
     * @returns {TypeFile} 資料
     */
    private setData(model: ModelFile): TypeFile {
        const data: TypeFile = {
            fileId: model.fileId,
            name: model.name,
            hashName: model.hashName,
            path: model.path,
            format: model.format,
            size: model.size,
        };

        return data;
    }
}
