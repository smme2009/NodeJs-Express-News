import { Op } from "sequelize";
import ISearch from "@/type/request/shop/product/search";
import ModelProduct from "@/model/product";

// 商品
export default class Product {
    /**
     * 取得分頁
     *
     * @param {number} pageNumber 頁碼
     * @param {ISearch} searchData 搜尋資料
     *
     * @returns {Promise<ModelProduct[]>}
     */
    public async getPage(
        pageNumber: number,
        searchData: ISearch
    ): Promise<[ModelProduct[], number]> {
        const pageSize: number = parseInt(process.env.PAGE_SIZE ?? "15");
        const offset: number = pageSize * (pageNumber - 1);
        const where: any = this.getBasicWhere();

        // 關鍵字
        if (searchData.keyword !== "") {
            where[Op.and].push({
                name: { [Op.like]: "%" + searchData.keyword + "%" },
            });
        }

        // 商品類型
        if (searchData.productTypeId !== "") {
            where[Op.and].push({
                productTypeId: searchData.productTypeId,
            });
        }

        // 取得分頁
        const { count, rows } = await ModelProduct.findAndCountAll({
            where: where,
            order: [["created_at", "DESC"]],
            offset: offset,
            limit: pageSize,
        });

        const page: ModelProduct[] = rows;
        const total: number = count;

        return [page, total];
    }

    /**
     * 取得基本搜尋
     *
     * @returns {any}
     */
    private getBasicWhere() {
        const nowDate: Date = new Date();

        // 基本搜尋
        const where: any = {
            status: true,
            [Op.and]: [
                {
                    [Op.or]: [
                        { startAt: { [Op.lte]: nowDate } },
                        { startAt: { [Op.eq]: null } },
                    ],
                },
                {
                    [Op.or]: [
                        { endAt: { [Op.gte]: nowDate } },
                        { endAt: { [Op.eq]: null } },
                    ],
                },
            ],
        };

        return where;
    }
}
