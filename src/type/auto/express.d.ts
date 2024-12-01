declare namespace Express {
    interface Request {
        accountId?: number;
        jwtToken?: string;
    }
}
