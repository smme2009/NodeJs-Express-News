import { Sequelize } from "sequelize-typescript";
import ModelProduct from "@/model/product";

const sequelize: Sequelize = new Sequelize(
    process.env.DB_DATABASE ?? "",
    process.env.DB_USERNAME ?? "",
    process.env.DB_PASSWORD ?? "",
    {
        host: process.env.DB_HOST ?? "",
        dialect: "mysql",
    }
);

sequelize.addModels([ModelProduct]);

export default sequelize;
