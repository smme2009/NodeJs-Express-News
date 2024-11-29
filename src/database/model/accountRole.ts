import { Table, Model, Column, DataType } from "sequelize-typescript";

// 帳號角色
@Table({
    tableName: "account_role",
})
export default class AccountRole extends Model {
    @Column({
        field: "account_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        comment: "帳號ID",
    })
    accountId!: number;

    @Column({
        field: "role_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        comment: "角色ID",
    })
    roleId!: number;
}
