require("dotenv").config();

// 取得env模式
const node = process.env.NODE_ENV;

require("dotenv").config({ path: `.env.${node}` });

// 根據env模式產生指定config
module.exports = {
	[node]: {
		username: process.env.DB_USERNAME ?? "",
		password: process.env.DB_PASSWORD ?? "",
		database: process.env.DB_DATABASE ?? "",
		host: process.env.DB_HOST ?? "",
		dialect: "mysql",
		migrationStorageTableName: 'migration',
	},
};