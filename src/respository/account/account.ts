import ModelAccount from "@/database/model/account";
import ModelRole from "@/database/model/role";

// 帳號
export default class Account {
    // 角色ID
    private roleId: number;

    /**
     * 建構子
     *
     * @param {number} roleId 角色ID
     */
    constructor(roleId: number) {
        this.roleId = roleId;
    }

    /**
     * 取得帳號(帳號)
     *
     * @param {string} account 帳號
     *
     * @returns {Promise<null | ModelAccount>} 帳號
     */
    public async getByAccount(account: string): Promise<null | ModelAccount> {
        const model: null | ModelAccount = await ModelAccount.findOne({
            where: {
                status: true,
                account: account,
            },
            include: {
                model: ModelRole,
                where: { roleId: this.roleId },
            },
        });

        return model;
    }

    /**
     * 取得帳號(ID)
     *
     * @param {number} accountId 帳號ID
     *
     * @returns {Promise<null | ModelAccount>} 帳號
     */
    public async getById(accountId: number): Promise<null | ModelAccount> {
        const model: null | ModelAccount = await ModelAccount.findOne({
            where: {
                status: true,
                accountId: accountId,
            },
        });

        return model;
    }
}
