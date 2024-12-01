import TypeNewsType from "@/type/data/newsType";
import TypeModelPage from "@/type/system/modelPage";
import ModelNewsType from "@/database/model/newsType";
import { WhereOptions } from "sequelize";

// 新聞類型
export default class Type {
    /**
     * 取得新聞類型(ID)
     *
     * @param {number} newsTypeId 新聞類型ID
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<null | ModelNewsType>} Model
     */
    public async getById(
        newsTypeId: number,
        hasCondition: boolean
    ): Promise<null | ModelNewsType> {
        const model: null | ModelNewsType = await ModelNewsType.findOne({
            where: {
                newsTypeId: newsTypeId,
                ...(hasCondition === true ? this.getCondition() : {}),
            },
        });

        return model;
    }

    /**
     * 取得新聞類型分頁
     *
     * @param {number} pageNumber 頁碼
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<TypePage<ModelNewsType>>} 分頁資料
     */
    public async getPage(
        pageNumber: number,
        hasCondition: boolean
    ): Promise<TypeModelPage<ModelNewsType>> {
        const pageSize: number = parseInt(process.env.PAGE_SIZE);

        const modelPage: TypeModelPage<ModelNewsType> =
            await ModelNewsType.findAndCountAll({
                where: hasCondition === true ? this.getCondition() : undefined,
                order: [["newsTypeId", "DESC"]],
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            });

        return modelPage;
    }

    /**
     * 取得所有新聞類型
     *
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<ModelNewsType[]>} 所有資料
     */
    public async getAll(hasCondition: boolean): Promise<ModelNewsType[]> {
        const modelAll: ModelNewsType[] = await ModelNewsType.findAll({
            where: hasCondition === true ? this.getCondition() : undefined,
            order: [["newsTypeId", "DESC"]],
        });

        return modelAll;
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
        const model: null | ModelNewsType = await ModelNewsType.findByPk(
            newsTypeId
        );

        if (model === null) {
            return null;
        }

        return await this.saveModel(model, data);
    }

    /**
     * 刪除新聞類型
     *
     * @param {number} newsTypeId 新聞類型ID
     *
     * @returns {Promise<boolean>} 是否成功
     */
    public async delete(newsTypeId: number): Promise<boolean> {
        const model: null | ModelNewsType = await ModelNewsType.findByPk(
            newsTypeId
        );

        if (model === null) {
            return false;
        }

        let isDelete: boolean = false;

        try {
            await model.destroy();
            isDelete = true;
        } catch (error: any) {
            console.log("刪除新聞類型Model失敗");
        }

        return isDelete;
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

    /**
     * 取得條件
     *
     * @returns {WhereOptions} 條件
     */
    private getCondition(): WhereOptions {
        const condition: WhereOptions = {
            status: 1,
        };

        return condition;
    }
}
