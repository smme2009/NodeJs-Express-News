import { Sequelize } from "sequelize-typescript";

// Database
export default class Database {
    // Database實體
    private static database: Sequelize;

    /**
     * 初始化Database
     *
     * @returns {void}
     */
    public static init(): void {
        // 設定連線資訊
        const sequelize: Sequelize = new Sequelize(
            process.env.DB_DATABASE!,
            process.env.DB_USERNAME!,
            process.env.DB_PASSWORD!,
            {
                host: process.env.DB_HOST!,
                dialect: "mysql",
            }
        );

        // 加入Model
        sequelize.addModels([global.appPath + "/database/model"]);

        this.database = sequelize;
    }

    /**
     * 取得Database實體
     *
     * @returns {Sequelize} Database實體
     */
    public static get(): Sequelize {
        return this.database;
    }
}
