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
     * @param {Request} eRequrest 框架Request
     * @param {Response} eResponse 框架Response
     *
     * @returns {Response}
     */
    public async login(
        eRequrest: Request,
        eResponse: Response
    ): Promise<Response> {
        const account: string = eRequrest.body.account;
        const password: string = eRequrest.body.password;

        const data: null | TypeAdmin = await this.srcAdmin.login(
            account,
            password
        );

        if (data === null) {
            const json: TypeResponse = {
                message: "登入失敗",
            };

            return eResponse.status(401).json(json);
        }

        const json: TypeResponse = {
            message: "登入成功",
            data: {
                jwtToken: this.toolJwt.encode({ adminId: data.adminId }),
            },
        };

        return eResponse.status(200).json(json);
    }
}
