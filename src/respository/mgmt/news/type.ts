import TypeNewsType from "@/type/data/newsType";
import TypeModelPage from "@/type/system/modelPage";
import ModelNewsType from "@/database/model/newsType";

// 新聞類型
export default class Type {
    /**
     * 取得新聞類型(ID)
     *
     * @param {number} newsTypeId 新聞類型ID
     *
     * @returns {Promise<null | ModelNewsType>} Model
     */
    public async getById(newsTypeId: number): Promise<null | ModelNewsType> {
        const model: null | ModelNewsType = await ModelNewsType.findByPk(
            newsTypeId
        );

        return model;
    }

    /**
     * 取得新聞類型分頁
     *
     * @param {number} pageNumber 頁碼
     *
     * @returns {Promise<TypePage<ModelNewsType>>} 分頁資料
     */
    public async getPage(
        pageNumber: number
    ): Promise<TypeModelPage<ModelNewsType>> {
        const pageSize: number = parseInt(process.env.PAGE_SIZE);

        const modelPage: TypeModelPage<ModelNewsType> =
            await ModelNewsType.findAndCountAll({
                where: {
                    status: true,
                },
                order: [["newsTypeId", "DESC"]],
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            });

        return modelPage;
    }

    /**
     * 新增新聞類型
     *
     * @param {TypeNewsType} data 資料
     *
     * @returns {Promise<null | ModelNewsType>} Model
     */
    public async insert(data: TypeNewsType): Promise<null | ModelNewsType> {
        const model: null | ModelNewsType = ModelNewsType.build();

        return await this.saveModel(model, data);
    }

    /**
     * 更新新聞類型
     *
     * @param {number} newsTypeId 新聞類型ID
     * @param {TypeNewsType} data 資料
     *
     * @returns {Promise<null | ModelNewsType>} Model
     */
    public async update(
        newsTypeId: number,
        data: TypeNewsType
    ): Promise<null | ModelNewsType> {
        const model: null | ModelNewsType = await this.getById(newsTypeId);

        if (model === null) {
            return null;
        }

        return await this.saveModel(model, data);
    }

    /**
     * 取得新聞類型(透過名稱並包含軟刪資料)
     *
     * @param {string} name 名稱
     *
     * @returns {Promise<null | ModelNewsType>} 新聞類型
     */
    public async getByNameWithSoft(
        name: string
    ): Promise<null | ModelNewsType> {
        const model: null | ModelNewsType = await ModelNewsType.findOne({
            where: {
                name: name,
            },
            paranoid: false,
        });

        return model;
    }

    /**
     * 儲存Model
     *
     * @param {ModelNewsType} model Model
     * @param {TypeNewsType} data 資料
     *
     * @returns {null | ModelNewsType} 儲存後的Model
     */
    private async saveModel(
        model: ModelNewsType,
        data: TypeNewsType
    ): Promise<null | ModelNewsType> {
        let resultModel: null | ModelNewsType = null;

        try {
            model.name = data.name;
            model.status = data.status!;
            resultModel = await model.save();
        } catch (error) {
            console.log("儲存新聞類型Model失敗");
        }

        return resultModel;
    }
}
