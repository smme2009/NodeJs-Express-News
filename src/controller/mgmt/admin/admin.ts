import Controller from "@/controller/controller";
import TypeJson from "@/type/system/json";
import TypeAdmin from "@/type/data/admin";
import { Request, Response } from "express";
import SrcAdmin from "@/service/mgmt/admin/admin";
import ToolJwt from "@/tool/jwt";

// 管理者
export default class Admin extends Controller {
    // 框架Request
    private request: Request;

    // 框架Response
    private response: Response;

    // 管理者Service
    private srcAdmin: SrcAdmin;

    // JWT工具
    private toolJwt: ToolJwt;

    /**
     * 建構子
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     */
    constructor(request: Request, response: Response) {
        super();

        this.request = request;
        this.response = response;

        this.srcAdmin = new SrcAdmin();
        this.toolJwt = new ToolJwt();
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
        const data: null | TypeAdmin = await this.srcAdmin.login(
            account,
            password
        );

        if (data === null) {
            const json: TypeJson = this.getJson("登入失敗");
            this.response.status(401).json(json);
            return;
        }

        const json: TypeJson = this.getJson("登入成功", {
            jwtToken: this.toolJwt.encode({ adminId: data.adminId }),
        });

        this.response.status(200).json(json);
        return;
    }

    /**
     * 取得帳號資訊
     *
     * @returns {Promise<void>}
     */
    public async getInfo(): Promise<void> {
        const adminId: number = this.request.adminId!;

        // 取得帳號資訊
        const data: null | TypeAdmin = await this.srcAdmin.getInfo(adminId);

        if (data === null) {
            const json: TypeJson = this.getJson("取得帳號資訊失敗");
            this.response.status(400).json(json);
            return;
        }

        const json: TypeJson = this.getJson("成功取得帳號資訊", data);
        this.response.status(200).json(json);
        return;
    }
}
