import { Table, Model, Column, DataType } from "sequelize-typescript";

// 帳號
@Table({
    tableName: "account",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
})
export default class Account extends Model {
    @Column({
        field: "account_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "帳號ID",
    })
    accountId!: number;

    @Column({
        field: "account",
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        comment: "帳號",
    })
    account!: string;

    @Column({
        field: "password",
        type: DataType.STRING,
        allowNull: false,
        comment: "密碼",
    })
    password!: string;

    @Column({
        field: "name",
        type: DataType.STRING,
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
