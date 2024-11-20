import {
    Table,
    Model,
    Column,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from "sequelize-typescript";

// 管理者
@Table({
    tableName: "admin",
    paranoid: true,
})
export default class Admin extends Model<Admin> {
    @Column({
        field: "admin_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "管理者ID",
    })
    adminId!: number;

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

    @CreatedAt
    @Column({
        field: "created_at",
        type: DataType.DATE,
        allowNull: false,
        comment: "新增時間",
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        field: "updated_at",
        type: DataType.DATE,
        allowNull: false,
        comment: "更新時間",
    })
    updatedAt!: Date;

    @DeletedAt
    @Column({
        field: "deleted_at",
        type: DataType.DATE,
        allowNull: true,
        comment: "刪除時間",
    })
    deletedAt!: Date;
}
