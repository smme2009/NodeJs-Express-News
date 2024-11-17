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
    public async get(account: string): Promise<null | ModelAdmin> {
        const model: null | ModelAdmin = await ModelAdmin.findOne({
            where: {
                status: true,
                account: account,
            },
        });

        return model;
    }
}
