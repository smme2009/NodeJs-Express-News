'use strict';

/** 
 * 帳號身份資料表
 * 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'account_role',
			{
				account_id: {
					type: Sequelize.BIGINT.UNSIGNED,
					primaryKey: true,
					allowNull: false,
					comment: '帳號ID'
				},
				role_id: {
					type: Sequelize.BIGINT.UNSIGNED,
					primaryKey: true,
					allowNull: false,
					comment: '角色ID'
				},
			});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('account_role');
	}
};
