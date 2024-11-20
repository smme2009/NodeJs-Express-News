"use strict";

/**
 * 會員資料表
 * 
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"admin",
			{
				admin_id: {
					type: Sequelize.BIGINT.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
					comment: '管理者ID'
				},
				account: {
					type: Sequelize.STRING,
					unique: true,
					allowNull: false,
					comment: '帳號',
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false,
					comment: '密碼',
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
					comment: '名稱',
				},
				status: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					comment: '狀態',
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
					comment: '新增時間',
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
					comment: '更新時間',
				},
				deleted_at: {
					type: Sequelize.DATE,
					allowNull: true,
					comment: '刪除時間',
				},
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("admin");
	},
};
