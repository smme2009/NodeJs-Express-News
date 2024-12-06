'use strict';

/** 
 * 檔案資料表
 * 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'file',
			{
				file_id: {
					type: Sequelize.BIGINT.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
					comment: '檔案ID'
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
					comment: "名稱",
				},
				hash_name: {
					type: Sequelize.STRING,
					unique: true,
					allowNull: false,
					comment: "雜湊名稱",
				},
				path: {
					type: Sequelize.TEXT,
					allowNull: false,
					comment: "路徑",
				},
				format: {
					type: Sequelize.STRING,
					allowNull: false,
					comment: "檔案格式",
				},
				size: {
					type: Sequelize.INTEGER.UNSIGNED,
					allowNull: false,
					comment: "檔案大小",
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
		await queryInterface.dropTable('file');
	}
};
