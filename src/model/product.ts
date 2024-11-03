import { CreationOptional } from "sequelize";

import {
    Table,
    Model,
    Column,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from "sequelize-typescript";

@Table({
    tableName: "product",
})
export default class Product extends Model<Product> {
    @Column({
        field: "product_id",
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    })
    productId!: CreationOptional<number>;

    @Column({
        field: "product_type_id",
        type: DataType.BIGINT,
        allowNull: false,
    })
    productTypeId!: Date;

    @Column({
        field: "name",
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        field: "start_at",
        type: DataType.STRING,
        allowNull: true,
    })
    startAt!: null | Date;

    @Column({
        field: "end_at",
        type: DataType.STRING,
        allowNull: true,
    })
    endAt!: null | Date;

    @Column({
        field: "photo_fid",
        type: DataType.NUMBER,
        allowNull: false,
    })
    photoFid!: number;

    @Column({
        field: "price",
        type: DataType.NUMBER,
        allowNull: false,
    })
    price!: number;

    @Column({
        field: "quantity",
        type: DataType.NUMBER,
        allowNull: false,
    })
    quantity!: number;

    @Column({
        field: "description",
        type: DataType.TEXT,
        allowNull: false,
    })
    description!: string;

    @Column({
        field: "page_html",
        type: DataType.TEXT,
        allowNull: true,
    })
    pageHtml!: string;

    @Column({
        field: "status",
        type: DataType.TINYINT,
        allowNull: false,
    })
    status!: number;

    @CreatedAt
    @Column({
        field: "created_at",
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        field: "updated_at",
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;

    @DeletedAt
    @Column({
        field: "deleted_at",
        type: DataType.DATE,
        allowNull: true,
    })
    deletedAt!: null | Date;
}
