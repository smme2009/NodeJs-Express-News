import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeAccount from "@/type/data/account";
import { Request, Response } from "express";
import SrcAccount from "@/service/account/account";

// 帳號
export default class Account extends Controller {
    /**
     * 建構子
     */
    constructor(
        // 帳號Service
        private srcAccount: SrcAccount = new SrcAccount()
    ) {
        super();
    }

    /**
     * 登入
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     * @param {number} roleId 角色ID
     *
     * @returns {Promise<Response>}
     */
    public async login(
        request: Request,
        response: Response,
        roleId: number
    ): Promise<Response> {
        const account: string = request.body.account;
        const password: string = request.body.password;

        // 登入
        const data: null | TypeAccount = await this.srcAccount.login(
            account,
            password,
            roleId
        );

        if (data === null) {
            const json: TypeJson = this.getJson("帳號或密碼錯誤");
            return response.status(401).json(json);
        }

        // 取得JWT Token
        const jwtToken: null | string = await this.srcAccount.getJwtToken(data);

        if (jwtToken === null) {
            const json: TypeJson = this.getJson("取得JWT Token失敗");
            return response.status(401).json(json);
        }

        const json: TypeJson = this.getJson("登入成功", { jwtToken: jwtToken });
        return response.status(200).json(json);
    }

    /**
     * 取得帳號資訊
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     *
     * @returns {Promise<Response>}
     */
    public async getInfo(
        request: Request,
        response: Response
    ): Promise<Response> {
        const accountId: number = request.account!.accountId!;

        // 取得帳號資訊
        const data: null | TypeAccount = await this.srcAccount.getInfo(
            accountId
        );

        if (data === null) {
            const json: TypeJson = this.getJson("取得帳號資訊失敗");
            return response.status(400).json(json);
        }

        const json: TypeJson = this.getJson("成功取得帳號資訊", data);
        return response.status(200).json(json);
    }

    /**
     * 登出
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     *
     * @returns {Promise<Response>}
     */
    public async logout(
        request: Request,
        response: Response
    ): Promise<Response> {
        const jwtToken: string = request.account!.jwtToken!;

        // 登出
        const isDelete: boolean = await this.srcAccount.logout(jwtToken);

        if (isDelete === false) {
            const json: TypeJson = this.getJson("登出失敗");
            return response.status(400).json(json);
        }

        const json: TypeJson = this.getJson("成功登出");
        return response.status(200).json(json);
    }
}
