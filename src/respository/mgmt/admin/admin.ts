import ModelAdmin from "@/database/model/admin";

// 管理者
export default class Admin {
    /**
     * 取得管理者(帳號)
     *
     * @param {string} account 帳號
     *
     * @returns {Promise<null | ModelAdmin>} 管理者
     */
    public async getWithAccount(account: string): Promise<null | ModelAdmin> {
        const model: null | ModelAdmin = await ModelAdmin.findOne({
            where: {
                status: true,
                account: account,
            },
        });

        return model;
    }

    /**
     * 取得管理者(ID)
     *
     * @param {number} adminId 管理者ID
     *
     * @returns {Promise<null | ModelAdmin>} 管理者
     */
    public async getWithId(adminId: number): Promise<null | ModelAdmin> {
        const model: null | ModelAdmin = await ModelAdmin.findOne({
            where: {
                status: true,
                adminId: adminId,
            },
        });

        return model;
    }
}
