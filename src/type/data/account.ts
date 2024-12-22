export default interface Account {
    // 基本
    accountId?: number;
    account?: string;
    password?: string;
    name?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;

    // 額外
    roleId?: number;
    jwtToken?: string;
}
