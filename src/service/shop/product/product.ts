import ISearch from "@/type/request/shop/product/search";
import IPage from "@/type/system/page";
import RepoProduct from "@/respository/shop/product/product";

// 商品
export default class Product {
    private repoProduct: RepoProduct;

    constructor() {
        this.repoProduct = new RepoProduct();
    }

    /**
     * 取得分頁
     *
     * @param {number} pageNumber 頁碼
     * @param {ISearch} searchData 搜尋資料
     *
     * @returns {Promise<IPage>}
     */
    public async getPage(
        pageNumber: number,
        searchData: ISearch
    ): Promise<IPage> {
        // 取得分頁資料
        const [repoPage, total] = await this.repoProduct.getPage(
            pageNumber,
            searchData
        );

        const data: object[] = repoPage.map((item) => {
            const data: object = {
                productId: item.productId,
            };

            return data;
        });

        const page: IPage = {
            total: total,
            data: data,
        };

        return page;
    }
}
