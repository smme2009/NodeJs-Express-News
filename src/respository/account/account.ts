import TypeAccount from "@/type/data/account";
import Database from "@/database/database";
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

    /**
     * 新增帳號
     *
     * @param {TypeAccount} data 資料
     *
     * @returns {Promise<null | ModelAccount>} Model
     */
    public async insert(data: TypeAccount): Promise<null | ModelAccount> {
        let resultModel: null | ModelAccount = null;

        try {
            await Database.get().transaction(async () => {
                const model: ModelAccount = ModelAccount.build();

                // 新增帳號
                resultModel = await this.saveModel(model, data);

                if (resultModel === null) {
                    throw new Error("新增帳號失敗");
                }

                // 新增帳號的角色
                const isInsert: boolean = await this.insertRole(resultModel);

                if (isInsert === false) {
                    throw new Error("新增帳號的角色失敗");
                }
            });
        } catch (error: any) {
            console.log(error);
            return null;
        }

        return resultModel;
    }

    /**
     * 儲存Model
     *
     * @param {ModelAccount} model Model
     * @param {TypeAccount} data 資料
     *
     * @returns {null | ModelAccount} 儲存後的Model
     */
    private async saveModel(
        model: ModelAccount,
        data: TypeAccount
    ): Promise<null | ModelAccount> {
        let resultModel: null | ModelAccount = null;

        try {
            model.account = data.account!;
            model.password = data.password!;
            model.name = data.name!;
            model.status = 1;
            resultModel = await model.save();
        } catch (error: any) {
            console.log("儲存帳號Model失敗");
        }

        return resultModel;
    }

    /**
     * 新增帳號角色
     *
     * @param {ModelAccount} model Model
     *
     * @returns {Promise<boolean>} 是否新增成功
     */
    private async insertRole(model: ModelAccount): Promise<boolean> {
        // 取得角色model
        const modelRole: null | ModelRole = await ModelRole.findByPk(
            this.roleId
        );

        if (modelRole === null) {
            return false;
        }

        // 新增帳號的角色
        try {
            await model.$add("role", modelRole);
        } catch (error: any) {
            console.log("新增帳號角色Model失敗");
            return false;
        }

        return true;
    }
}
