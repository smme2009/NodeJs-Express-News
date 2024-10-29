import express from "express";
import env from "dotenv";

// 初始化env
env.config();

const app = express();
const port = 3000;

app.listen(port);
