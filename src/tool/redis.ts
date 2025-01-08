import { createClient, RedisClientType } from "redis";

// Redis工具
export default class Redis {
    // Redis工具實體
    private static instance: null | Redis = null;

    /**
     * private建構子防止被外部new
     */
    private constructor(
        // Redis套件
        private redis: RedisClientType = createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        })
    ) {
        // 連線
        this.redis.connect();
    }

    /**
     * 取得Redis工具實體
     *
     * @returns {Redis} Redis工具實體
     */
    public static getInstance(): Redis {
        if (Redis.instance === null) {
            Redis.instance = new Redis();
        }

        return Redis.instance;
    }

    /**
     * 取得Redis套件，需要使用原生方法時使用
     *
     * @returns {RedisClientType} Redis套件
     */
    public getRedis(): RedisClientType {
        return this.redis;
    }

    /**
     * 設定
     *
     * @param {string} key 鍵
     * @param {string | number} value 值
     * @param {number} limitTime 限制時間
     *
     * @returns {Promise<boolean>} 是否設定成功
     */
    public async set(
        key: string,
        value: string | number,
        limitTime?: number
    ): Promise<boolean> {
        let result: null | string = null;

        if (limitTime === undefined) {
            result = await this.redis.set(key, value);
        } else {
            result = await this.redis.set(key, value, {
                EX: limitTime,
            });
        }

        // 成功設定時Redis會回傳OK這個字
        const isSet: boolean = result === "OK" ? true : false;

        return isSet;
    }

    /**
     * 是否有鍵
     *
     * @param {string} key 鍵
     *
     * @returns {Promise<boolean>} 是否有鍵
     */
    public async hasKey(key: string): Promise<boolean> {
        const total: number = await this.redis.exists(key);
        const hasKey: boolean = total === 1 ? true : false;

        return hasKey;
    }

    /**
     * 刪除
     *
     * @param {string} key 鍵
     *
     * @returns {Promise<boolean>} 是否刪除
     */
    public async delete(key: string): Promise<boolean> {
        const total: number = await this.redis.del(key);
        const isDelete: boolean = total === 1 ? true : false;

        return isDelete;
    }
}
