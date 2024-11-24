"use strict";

/**
 * 新聞類型資料表
 *
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("news_type", {
			news_type_id: {
				type: Sequelize.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				comment: "新聞類型ID",
			},
			name: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				comment: "名稱",
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				comment: "狀態",
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				comment: "新增時間",
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				comment: "更新時間",
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
				comment: "刪除時間",
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("news_type");
	},
};
