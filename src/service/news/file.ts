import TypeFile from "@/type/data/file";
import RepoFile from "@/respository/file/file";
import ModelFile from "@/database/model/file";
import ToolFile from "@/tool/file";
import ConfigFileFormat from "@/config/fileFormat";

// 新聞檔案
export default class File {
    /**
     * 建構子
     */
    constructor(
        // 檔案Respository
        private repoFile: RepoFile = new RepoFile()
    ) {}

    /**
     * 檢查檔案
     *
     * @param {TypeFile} data 資料
     *
     * @returns {null | string[]} 錯誤訊息
     */
    public checkFile(data: TypeFile): null | string[] {
        const errorList: string[] = [];

        // 限制格式
        const formatList: string[] = [
            ConfigFileFormat.jpeg,
            ConfigFileFormat.png,
            ConfigFileFormat.gif,
        ];

        // 檢查檔案格式
        if (formatList.includes(data.format) === false) {
            errorList.push(`檔案格式錯誤，需為jpeg、png、gif`);
        }

        // 檢查檔案大小
        if (data.size > 200000) {
            errorList.push("檔案大小錯誤，不可大於2MB");
        }

        if (errorList.length === 0) {
            return null;
        }

        return errorList;
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
        const filePath: null | string = ToolFile.save("news", data);

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
