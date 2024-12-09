require("dotenv").config();

// 根據env模式產生指定con
module.exports = {
	[process.env.NODE_ENV]: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
		migrationStorageTableName: 'migration',
	},
};