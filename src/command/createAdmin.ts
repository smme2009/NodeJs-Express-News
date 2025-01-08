import TypeAccount from "@/type/data/account";
import { program, OptionValues } from "commander";
import Env from "dotenv";
import Bcrypt from "bcrypt";
import RepoAccount from "@/respository/account/account";
import ModelAccount from "@/database/model/account";
import configRole from "@/config/role";

// 初始化env
Env.config();

// 初始化Respository
const repoAccount: RepoAccount = new RepoAccount();

// 設定command
program
    .version("1.0.0")
    .description("新增管理者的指令")
    .option("-a, --account <string>", "輸入帳號")
    .option("-p, --password <string>", "輸入密碼")
    .parse(process.argv);

// 取得參數
const option: OptionValues = program.opts();
const account: undefined | string = option.account;
const password: undefined | string = option.password;

// 檢查帳號
if (account === undefined) {
    console.log("請輸入帳號");
    process.exit();
}

// 檢查密碼
if (password === undefined) {
    console.log("請輸入密碼");
    process.exit();
}

// 管理員資料
const data: TypeAccount = {
    account: account,
    password: Bcrypt.hashSync(password, 10),
    name: account,
};

// 新增管理員
repoAccount
    .insert(data, configRole.admin)
    .then((modelAccount: null | ModelAccount) => {
        const message: string = modelAccount === null ? "失敗" : "成功";
        console.log(`新增管理員${message}`);
    })
    .catch((error: any) => {
        console.log(`新增管理員失敗`, error);
    });
