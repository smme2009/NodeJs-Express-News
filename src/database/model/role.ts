import { Table, Model, Column, DataType } from "sequelize-typescript";

// 角色
@Table({
    tableName: "role",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
})
export default class Role extends Model {
    @Column({
        field: "role_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "角色ID",
    })
    roleId!: number;

    @Column({
        field: "name",
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        comment: "名稱",
    })
    name!: string;
}
