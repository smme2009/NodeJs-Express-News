import TypeJson from "@/type/system/json";

export default class Controller {
    /**
     * 取得Response用JSON
     *
     * @param {string} message 訊息
     * @param {object} data 資料
     *
     * @returns {TypeJson} JSON
     */
    protected getJson(message: string, data: object = {}): TypeJson {
        const json: TypeJson = {
            message: message,
            data: data,
        };

        return json;
    }
}
