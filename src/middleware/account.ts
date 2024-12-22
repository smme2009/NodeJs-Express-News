import TypeJson from "@/type/system/json";
import TypeAccount from "@/type/data/account";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import ToolJwt from "@/tool/jwt";
import ToolRedis from "@/tool/redis";

// 帳號驗證
export default class Account {
    /**
     * 建構子
     *
     * @param {number} roleId 角色ID
     * @param {ToolJwt} toolJwt JWT工具
     * @param {ToolRedis} toolRedis Redis工具
     */
    constructor(
        // 角色ID
        private roleId: number,

        // JWT工具
        private toolJwt: ToolJwt = new ToolJwt(),

        // Redis工具
        private toolRedis: ToolRedis = new ToolRedis()
    ) {}

    /**
     * 中介層處理
     *
     * @param {Request} request 框架Request
     * @param {Response} response 框架Response
     * @param {NextFunction} next 框架Next
     *
     * @returns {Promise<void>}
     */
    public async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        const auth: undefined | string = request.headers.authorization;

        if (auth === undefined) {
            const json: TypeJson = {
                message: "查無JWT Token",
            };

            response.status(401).json(json);
            return;
        }

        const jwtToken: string = auth.replace("Bearer ", "");

        // 驗證Token是否存在於白名單
        const hasKey: boolean = await this.toolRedis.hasKey(
            `jwtToken-${jwtToken}`
        );

        if (hasKey === false) {
            const json: TypeJson = {
                message: "JWT Token已失效",
            };

            response.status(401).json(json);
            return;
        }

        // 驗證JWT Token
        const data: null | JwtPayload = this.toolJwt.decode(jwtToken);

        if (data === null) {
            const json: TypeJson = {
                message: "JWT Token驗證失敗",
            };

            response.status(401).json(json);
            return;
        }

        // 驗證身份
        const isRole: boolean = data.roleId === this.roleId ? true : false;

        if (isRole === false) {
            const json: TypeJson = {
                message: "身份驗證失敗",
            };

            response.status(401).json(json);
            return;
        }

        const account: TypeAccount = {
            accountId: data.accountId,
            jwtToken: jwtToken,
        };

        // 設定Request
        request.account = account;

        next();
    }
}
