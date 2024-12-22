import TypeAccount from "@/type/data/account";

declare global {
    namespace Express {
        interface Request {
            account?: TypeAccount;
        }
    }
}
