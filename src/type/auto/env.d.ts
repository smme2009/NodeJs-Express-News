declare namespace NodeJS {
    interface ProcessEnv {
        // APP
        NODE_ENV: string;
        APP_PORT: string;
        APP_KEY: string;
        APP_URL: string;

        // DB
        DB_HOST: string;
        DB_PORT: string;
        DB_DATABASE: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;

        // CORS
        CORS_URL: string;

        // JWT
        JWT_LIMIT_DAY: string;

        PAGE_SIZE: string;
    }
}
