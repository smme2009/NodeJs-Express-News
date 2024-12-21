import TypeAccount from "@/type/data/account";
import Bcrypt from "bcrypt";
import RepoAccount from "@/respository/account/account";
import ModelAccount from "@/database/model/account";
import ModelRole from "@/database/model/role";
import ToolJwt from "@/tool/jwt";
import ToolRedis from "@/tool/redis";

// 帳號
export default class Account {
    /**
     * 建構子
     */
    constructor(
        // 帳號Respository
        private repoAccount: RepoAccount = new RepoAccount(),

        // JWT工具
        private toolJwt: ToolJwt = new ToolJwt(),

        // Redis工具
        private toolRedis: ToolRedis = new ToolRedis()
    ) {}

    /**
     * 登入
     *
     * @param {string} account 帳號
     * @param {string} password 密碼
     * @param {number} roleId 角色ID
     *
     * @returns {Promise<null | TypeAccount>} 帳號資料
     */
    public async login(
        account: string,
        password: string,
        roleId: number
    ): Promise<null | TypeAccount> {
        // 透過帳號取得資料
        const model: null | ModelAccount = await this.repoAccount.getByAccount(
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

        // 檢查權限
        const hasRole: undefined | ModelRole = model.role.find(
            (item: ModelRole) => item.roleId === roleId
        );

        if (hasRole === undefined) {
            return null;
        }

        return this.setData(model);
    }

    /**
     * 取的JWT Token
     *
     * @param {TypeAccount} data 資料
     *
     * @returns {Promise<null | string>} JWT Token
     */
    public async getJwtToken(data: TypeAccount): Promise<null | string> {
        const jwtToken: string = this.toolJwt.encode(data);

        // 設定白名單
        const key: string = `jwtToken-${jwtToken}`;
        const json: string = JSON.stringify(data);
        const limitTime: number = parseInt(process.env.JWT_LIMIT_DAY) * 86400;
        const isSet: boolean = await this.toolRedis.set(key, json, limitTime);

        if (isSet === false) {
            return null;
        }

        return jwtToken;
    }

    /**
     * 取得帳號資訊
     *
     * @param {number} accountId
     *
     * @returns {Promise<null | TypeAccount>} 帳號資訊
     */
    public async getInfo(accountId: number): Promise<null | TypeAccount> {
        // 透過ID取得資料
        const model: null | ModelAccount = await this.repoAccount.getById(
            accountId
        );

        if (model === null) {
            return null;
        }

        return this.setData(model);
    }

    /**
     * 登出
     *
     * @param {string} jwtToken JWT Token
     *
     * @returns {Promise<boolean>} 是否成功
     */
    public async logout(jwtToken: string): Promise<boolean> {
        return await this.toolRedis.delete(`jwtToken-${jwtToken}`);
    }

    /**
     * 設定資料
     *
     * @param {ModelAccount} model Model
     *
     * @returns {TypeAccount} 資料
     */
    private setData(model: ModelAccount): TypeAccount {
        const data: TypeAccount = {
            accountId: model.accountId,
            account: model.account,
            name: model.name,
        };

        return data;
    }
}
