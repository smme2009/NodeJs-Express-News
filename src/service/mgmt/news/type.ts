import TypeNewsType from "@/type/data/newsType";
import TypePage from "@/type/data/page";
import TypeModelPage from "@/type/system/modelPage";
import RepoNewsType from "@/respository/mgmt/news/type";
import ModelNewsType from "@/database/model/newsType";

// 新聞類型
export default class Type {
    private repoNewsType: RepoNewsType;

    constructor() {
        this.repoNewsType = new RepoNewsType();
    }

    /**
     * 取得新聞類型
     *
     * @param {number} newesTypeId 新聞類型ID
     *
     * @returns {Promise<null | TypeNewsType>} 資料
     */
    public async get(newesTypeId: number): Promise<null | TypeNewsType> {
        const model: null | ModelNewsType = await this.repoNewsType.getById(
            newesTypeId
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
     *
     * @returns {Promise<TypePage<TypeNewsType>>} 分頁資料
     */
    public async getPage(pageNumber: number): Promise<TypePage<TypeNewsType>> {
        const modelPage: TypeModelPage<ModelNewsType> =
            await this.repoNewsType.getPage(pageNumber);

        const page: TypePage<TypeNewsType> = {
            total: modelPage.count,
            data: modelPage.rows.map((item) => this.setData(item)),
        };

        return page;
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
