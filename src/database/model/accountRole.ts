import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
} from "sequelize-typescript";

import ModelAccount from "@/database/model/account";
import ModelRole from "@/database/model/role";

// 帳號角色
@Table({
    tableName: "account_role",
    timestamps: false,
})
export default class AccountRole extends Model {
    @ForeignKey(() => ModelAccount)
    @Column({
        field: "account_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        comment: "帳號ID",
    })
    accountId!: number;

    @ForeignKey(() => ModelRole)
    @Column({
        field: "role_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        comment: "角色ID",
    })
    roleId!: number;
}
