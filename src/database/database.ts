import { Sequelize } from "sequelize-typescript";
import { createNamespace, Namespace } from "cls-hooked";
import Path from "path";

// Database
export default class Database {
    // Database實體
    private static instance: null | Sequelize = null;

    // private建構子防止被外部new
    private constructor() {}

    /**
     * 取得Database實體
     *
     * @returns {Sequelize} Database實體
     */
    public static getInstance(): Sequelize {
        if (Database.instance === null) {
            Database.instance = Database.setInstance();
        }

        return Database.instance;
    }

    /**
     * 設定Database實體
     *
     * @returns {void}
     */
    private static setInstance(): Sequelize {
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

        return sequelize;
    }
}
