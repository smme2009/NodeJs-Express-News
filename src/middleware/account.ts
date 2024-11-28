import TypeJson from "@/type/system/json";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import ToolJwt from "@/tool/jwt";
import ToolRedis from "@/tool/redis";

// 帳號驗證
export default class Account {
    // JWT工具
    private toolJwt: ToolJwt;

    // Redis工具
    private toolRedis: ToolRedis;

    constructor() {
        this.toolJwt = new ToolJwt();
        this.toolRedis = new ToolRedis();
    }

    // 中介層處理
    public async handle(
        eRequest: Request,
        eResponse: Response,
        eNext: NextFunction
    ): Promise<void> {
        const auth: undefined | string = eRequest.headers.authorization;

        if (auth === undefined) {
            const json: TypeJson = {
                message: "查無JWT Token",
            };

            eResponse.status(401).json(json);
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

            eResponse.status(401).json(json);
            return;
        }

        // 驗證JWT Token
        const data: null | JwtPayload = this.toolJwt.decode(jwtToken);

        if (data === null) {
            const json: TypeJson = {
                message: "JWT Token驗證失敗",
            };

            eResponse.status(401).json(json);
            return;
        }

        // 設定帳號ID
        eRequest.adminId = data.adminId;
        eNext();
    }
}
