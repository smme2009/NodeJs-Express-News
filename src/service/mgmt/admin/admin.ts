import TypeAdmin from "@/type/data/admin";
import Bcrypt from "bcrypt";
import RepoAdmin from "@/respository/mgmt/admin/admin";
import ModelAdmin from "@/database/model/admin";

// 管理者
export default class Admin {
    private repoAdmin: RepoAdmin;

    constructor() {
        this.repoAdmin = new RepoAdmin();
    }

    /**
     * 登入
     *
     * @param {string} account 帳號
     * @param {string} password 密碼
     *
     * @returns {Promise<null | TypeAdmin>} 帳號資料
     */
    public async login(
        account: string,
        password: string
    ): Promise<null | TypeAdmin> {
        // 透過帳號取得資料
        const model: null | ModelAdmin = await this.repoAdmin.getWithAccount(
            account
        );

        if (model === null) {
            return null;
        }

        // 檢查密碼
        const isPass: boolean = Bcrypt.compareSync(password, model.password);

        if (isPass === false) {
            return null;
        }

        return this.setData(model);
    }

    /**
     * 取得帳號資訊
     *
     * @param {number} adminId
     *
     * @returns {Promise<null | TypeAdmin>} 帳號資訊
     */
    public async getInfo(adminId: number): Promise<null | TypeAdmin> {
        // 透過ID取得資料
        const model: null | ModelAdmin = await this.repoAdmin.getWithId(
            adminId
        );

        if (model === null) {
            return null;
        }

        return this.setData(model);
    }

    /**
     * 設定資料
     *
     * @param {ModelAdmin} model Model
     *
     * @returns {TypeAdmin} 資料
     */
    private setData(model: ModelAdmin): TypeAdmin {
        const data: TypeAdmin = {
            adminId: model.adminId,
            account: model.account,
            name: model.name,
        };

        return data;
    }
}
