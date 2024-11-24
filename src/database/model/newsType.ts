import { Table, Model, Column, DataType } from "sequelize-typescript";

// 新聞類型
@Table({
    tableName: "news_type",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
})
export default class NewsType extends Model {
    @Column({
        field: "news_type_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "新聞類型ID",
    })
    newsTypeId!: number;

    @Column({
        field: "name",
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        comment: "名稱",
    })
    name!: string;

    @Column({
        field: "status",
        type: DataType.BOOLEAN,
        allowNull: false,
        comment: "狀態",
    })
    status!: number;
}
