import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeAccount from "@/type/data/account";
import { Request, Response } from "express";
import SrcAccount from "@/service/account/account";

// 帳號
export default class Account extends Controller {
    // 帳號Service
    private srcAccount: SrcAccount;

    /**
     * 建構子
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     * @param {number} roleId 角色ID
     */
    constructor(request: Request, response: Response, roleId: number) {
        super(request, response);
        this.srcAccount = new SrcAccount(roleId);
    }

    /**
     * 登入
     *
     * @returns {Promise<void>}
     */
    public async login(): Promise<void> {
        const account: string = this.request.body.account;
        const password: string = this.request.body.password;

        // 登入
        const data: null | TypeAccount = await this.srcAccount.login(
            account,
            password
        );

        if (data === null) {
            const json: TypeJson = this.getJson("帳號或密碼錯誤");
            this.response.status(401).json(json);
            return;
        }

        // 取得JWT Token
        const jwtToken: null | string = await this.srcAccount.getJwtToken(data);

        if (jwtToken === null) {
            const json: TypeJson = this.getJson("取得JWT Token失敗");
            this.response.status(401).json(json);
            return;
        }

        const json: TypeJson = this.getJson("登入成功", { jwtToken: jwtToken });
        this.response.status(200).json(json);
    }

    /**
     * 取得帳號資訊
     *
     * @returns {Promise<void>}
     */
    public async getInfo(): Promise<void> {
        const accountId: number = this.request.accountId!;

        // 取得帳號資訊
        const data: null | TypeAccount = await this.srcAccount.getInfo(
            accountId
        );

        if (data === null) {
            const json: TypeJson = this.getJson("取得帳號資訊失敗");
            this.response.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功取得帳號資訊", data);
        this.response.status(200).json(json);
    }

    /**
     * 登出
     *
     * @returns {Promise<void>}
     */
    public async logout(): Promise<void> {
        const jwtToken: string = this.request.jwtToken!;

        // 登出
        const isDelete: boolean = await this.srcAccount.logout(jwtToken);

        if (isDelete === false) {
            const json: TypeJson = this.getJson("登出失敗");
            this.response.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功登出");
        this.response.status(200).json(json);
    }
}
