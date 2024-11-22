import TypeNewsType from "@/type/data/newsType";
import ModelNewsType from "@/database/model/newsType";

// 新聞類型
export default class Type {
    /**
     * 新增新聞類型
     *
     * @param {TypeNewsType} data 資料
     *
     * @returns {Promise<null | ModelNewsType>} Model
     */
    public async insert(data: TypeNewsType): Promise<null | ModelNewsType> {
        let model: null | ModelNewsType = null;

        try {
            model = await ModelNewsType.create({
                name: data.name,
                status: data.status!,
            });
        } catch (error: any) {
            console.error("新增新聞異常");
        }

        return model;
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
}
