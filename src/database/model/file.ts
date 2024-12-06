import { Table, Model, Column, DataType } from "sequelize-typescript";

// 檔案
@Table({
    tableName: "file",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
})
export default class File extends Model {
    @Column({
        field: "file_id",
        type: DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "檔案ID",
    })
    fileId!: number;

    @Column({
        field: "name",
        type: DataType.STRING,
        allowNull: false,
        comment: "名稱",
    })
    name!: string;

    @Column({
        field: "hash_name",
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        comment: "雜湊名稱",
    })
    hashName!: string;

    @Column({
        field: "path",
        type: DataType.TEXT,
        allowNull: false,
        comment: "路徑",
    })
    path!: string;

    @Column({
        field: "format",
        type: DataType.STRING,
        allowNull: false,
        comment: "檔案格式",
    })
    format!: string;

    @Column({
        field: "size",
        type: DataType.INTEGER,
        allowNull: false,
        comment: "檔案大小",
    })
    size!: number;
}
