import { sign, verify, JwtPayload, VerifyErrors } from "jsonwebtoken";

// JWT Token編解碼工具
export default class ToolJwt {
    /**
     * 編碼JWT Token
     *
     * @param {object} data 額外資料
     *
     * @returns {string} JWT Token
     */
    public encode(data: object): string {
        const payload: object = {
            iss: process.env.APP_URL, // 發行方
            aud: process.env.CORS_URL, // 使用
            ...data,
        };

        const option: object = {
            algorithm: "HS256", // 雜湊方式
            expiresIn: `${process.env.JWT_LIMIT_DAY}d`, // 有效時間
        };

        const jwtToken: string = sign(payload, process.env.APP_KEY!, option);

        return jwtToken;
    }

    /**
     * 解碼JWT Token
     *
     * @param {string} jwtToken JWT Token
     *
     * @returns {null | JwtPayload} 資料
     */
    public decode(jwtToken: string): null | JwtPayload {
        let data: null | JwtPayload = null;

        verify(
            jwtToken,
            process.env.APP_KEY!,
            (
                err: null | VerifyErrors,
                decoded: undefined | string | JwtPayload
            ) => {
                data = err === null ? (decoded as JwtPayload) : null;
            }
        );

        return data;
    }
}
