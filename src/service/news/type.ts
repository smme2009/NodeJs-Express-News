import TypeNewsType from "@/type/data/newsType";
import TypePage from "@/type/data/page";
import TypeModelPage from "@/type/system/modelPage";
import RepoNewsType from "@/respository/news/type";
import ModelNewsType from "@/database/model/newsType";

// 新聞類型
export default class Type {
    /**
     * 建構子
     */
    constructor(
        // 新聞類型Respository
        private repoNewsType: RepoNewsType = new RepoNewsType()
    ) {}

    /**
     * 取得新聞類型
     *
     * @param {number} newesTypeId 新聞類型ID
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<null | TypeNewsType>} 資料
     */
    public async get(
        newesTypeId: number,
        hasCondition: boolean
    ): Promise<null | TypeNewsType> {
        const model: null | ModelNewsType = await this.repoNewsType.getById(
            newesTypeId,
            hasCondition
        );

        if (model === null) {
            return null;
        }

        const data: TypeNewsType = this.setData(model);

        return data;
    }

    /**
     * 取得新聞類型分頁
     *
     * @param {number} pageNumber 頁碼
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {Promise<TypePage<TypeNewsType>>} 分頁資料
     */
    public async getPage(
        pageNumber: number,
        hasCondition: boolean
    ): Promise<TypePage<TypeNewsType>> {
        const modelPage: TypeModelPage<ModelNewsType> =
            await this.repoNewsType.getPage(pageNumber, hasCondition);

        const page: TypePage<TypeNewsType> = {
            total: modelPage.count,
            data: modelPage.rows.map((item) => this.setData(item)),
        };

        return page;
    }

    /**
     * 取得所有新聞類型
     *
     * @param {boolean} hasCondition 是否附加條件
     *
     * @returns {TypeNewsType[]} 所有新聞類型
     */
    public async getAll(hasCondition: boolean): Promise<TypeNewsType[]> {
        const modelAll: ModelNewsType[] = await this.repoNewsType.getAll(
            hasCondition
        );

        const all: TypeNewsType[] = modelAll.map((item) => {
            return this.setData(item);
        });

        return all;
    }

    /**
     * 新增新聞類型
     *
     * @param {TypeNewsType} data 資料
     *
     * @returns {Promise<null | TypeNewsType>} 資料
     */
    public async insert(data: TypeNewsType): Promise<null | TypeNewsType> {
        const model: null | ModelNewsType = await this.repoNewsType.insert(
            data
        );

        if (model === null) {
            return null;
        }

        return this.setData(model);
    }

    /**
     * 更新新聞類型
     *
     * @param {number} newsTypeId 新聞類型ID
     * @param {TypeNewsType} data 資料
     *
     * @returns {Promise<null | TypeNewsType>} 資料
     */
    public async update(
        newsTypeId: number,
        data: TypeNewsType
    ): Promise<null | TypeNewsType> {
        const model: null | ModelNewsType = await this.repoNewsType.update(
            newsTypeId,
            data
        );

        if (model === null) {
            return null;
        }

        return this.setData(model);
    }

    /**
     * 刪除新聞類型
     *
     * @param {number} newsTypeId 新聞類型ID
     *
     * @returns {Promise<boolean>} 是否成功
     */
    public async delete(newsTypeId: number): Promise<boolean> {
        return await this.repoNewsType.delete(newsTypeId);
    }

    /**
     * 檢查名稱是否可用
     *
     * @param {string} name 名稱
     * @param {number} newsTypeId 排除的新聞類型ID(更新時使用)
     *
     * @returns {Promise<boolean>} 是否可用
     */
    public async checkName(
        name: string,
        newsTypeId?: number
    ): Promise<boolean> {
        const model: null | ModelNewsType =
            await this.repoNewsType.getByNameWithSoft(name);

        if (model === null) {
            return true;
        }

        if (newsTypeId !== undefined && model.newsTypeId === newsTypeId) {
            return true;
        }

        return false;
    }

    /**
     * 設定資料
     *
     * @param {ModelNewsType} model Model
     *
     * @returns {TypeNewsType} 資料
     */
    private setData(model: ModelNewsType): TypeNewsType {
        const data: TypeNewsType = {
            newsTypeId: model.newsTypeId,
            name: model.name,
            status: model.status,
        };

        return data;
    }
}
