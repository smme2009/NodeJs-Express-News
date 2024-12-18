import { Sequelize } from "sequelize-typescript";
import { createNamespace, Namespace } from "cls-hooked";
import Path from "path";

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
        // 使用cls-hooked讓sequelize可以自動傳遞transaction參數
        const namespace: Namespace = createNamespace("transaction");
        Sequelize.useCLS(namespace);

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

        // 為了能在command可以兼容使用，所以不使用從app.ts來的path
        const modelPath: string = Path.join(__dirname, "model");

        // 加入Model
        sequelize.addModels([modelPath]);

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
