import TypeFile from "@/type/data/file";
import RepoFile from "@/respository/file/file";
import ModelFile from "@/database/model/file";

// 檔案
export default class File {
    // 檔案Respository
    private repoFile: RepoFile;

    /**
     * 建構子
     */
    constructor() {
        this.repoFile = new RepoFile();
    }

    /**
     * 新增檔案資料
     *
     * @param {TypeFile} data 資料
     *
     * @returns {Promise<null | TypeFile>} 資料
     */
    public async insert(data: TypeFile): Promise<null | TypeFile> {
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
