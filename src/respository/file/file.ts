import TypeFile from "@/type/data/file";
import ModelFile from "@/database/model/file";

// 檔案
export default class File {
    /**
     * 新增檔案資料
     *
     * @param {TypeFile} data 資料
     *
     * @returns {Promise<null | ModelFile>} Model
     */
    public async insert(data: TypeFile): Promise<null | ModelFile> {
        const model: ModelFile = ModelFile.build();

        return await this.saveModel(model, data);
    }

    /**
     * 儲存Model
     *
     * @param {ModelFile} model Model
     * @param {TypeFile} data 資料
     *
     * @returns {null | ModelFile} 儲存後的Model
     */
    private async saveModel(
        model: ModelFile,
        data: TypeFile
    ): Promise<null | ModelFile> {
        let resultModel: null | ModelFile = null;

        try {
            model.name = data.name;
            model.hashName = data.hashName;
            model.path = data.path;
            model.format = data.format;
            model.size = data.size;
            resultModel = await model.save();
        } catch (error) {
            console.log("儲存檔案Model失敗");
        }

        return resultModel;
    }
}
