import TypeNewsType from "@/type/data/newsType";
import RepoNewsType from "@/respository/mgmt/news/type";
import ModelNewsType from "@/database/model/newsType";

// 新聞類型
export default class Type {
    private repoNewsType: RepoNewsType;

    constructor() {
        this.repoNewsType = new RepoNewsType();
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
     * 檢查名稱是否可用
     *
     * @param {string} name 名稱
     *
     * @returns {Promise<boolean>} 是否可用
     */
    public async checkName(name: string): Promise<boolean> {
        const model: null | ModelNewsType =
            await this.repoNewsType.getByNameWithSoft(name);

        const isPass: boolean = model === null ? true : false;

        return isPass;
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
        };

        return data;
    }
}
