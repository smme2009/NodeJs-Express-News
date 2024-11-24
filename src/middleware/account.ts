import TypeJson from "@/type/system/json";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import ToolJwt from "@/tool/jwt";

// 帳號驗證
export default class Account {
    private toolJwt: ToolJwt;

    constructor() {
        this.toolJwt = new ToolJwt();
    }

    // 中介層處理
    public handle(
        eRequest: Request,
        eResponse: Response,
        eNext: NextFunction
    ): void {
        const auth: undefined | string = eRequest.headers.authorization;

        if (auth === undefined) {
            const json: TypeJson = {
                message: "查無JWT Token",
            };

            eResponse.status(401).json(json);
            return;
        }

        const jwtToken: string = auth.replace("Bearer ", "");

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
