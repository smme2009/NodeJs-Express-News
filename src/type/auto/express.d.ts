declare namespace Express {
    interface Request {
        adminId?: number;
        jwtToken?: string;
    }
}
