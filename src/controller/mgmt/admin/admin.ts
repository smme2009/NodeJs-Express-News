import TypeResponse from "@/type/system/response";
import TypeAdmin from "@/type/data/admin";
import { Request, Response } from "express";
import SrcAdmin from "@/service/mgmt/admin/admin";
import ToolJwt from "@/tool/jwt";

// 管理者
export default class Admin {
    private srcAdmin: SrcAdmin;
    private toolJwt: ToolJwt;

    constructor() {
        this.srcAdmin = new SrcAdmin();
        this.toolJwt = new ToolJwt();
    }

    /**
     * 登入
     *
     * @param {Request} eRequest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Promise<void>}
     */
    public async login(eRequest: Request, eResponse: Response): Promise<void> {
        const account: string = eRequest.body.account;
        const password: string = eRequest.body.password;

        // 登入
        const data: null | TypeAdmin = await this.srcAdmin.login(
            account,
            password
        );

        if (data === null) {
            const json: TypeResponse = {
                message: "登入失敗",
            };

            eResponse.status(401).json(json);
            return;
        }

        const json: TypeResponse = {
            message: "登入成功",
            data: {
                jwtToken: this.toolJwt.encode({ adminId: data.adminId }),
            },
        };

        eResponse.status(200).json(json);
        return;
    }

    /**
     * 取得帳號資訊
     *
     * @param {Request} eRequest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Promise<void>}
     */
    public async getInfo(
        eRequest: Request,
        eResponse: Response
    ): Promise<void> {
        const adminId: number = eRequest.adminId!;

        // 取得帳號資訊
        const data: null | TypeAdmin = await this.srcAdmin.getInfo(adminId);

        if (data === null) {
            const json: TypeResponse = {
                message: "取得帳號資訊失敗",
            };

            eResponse.status(400).json(json);
            return;
        }

        const json: TypeResponse = {
            message: "成功取得帳號資訊",
            data: data,
        };

        eResponse.status(200).json(json);
        return;
    }
}
