declare namespace NodeJS {
    interface ProcessEnv {
        // APP
        NODE_ENV: string;
        APP_PORT: string;

        // DB
        DB_HOST: string;
        DB_PORT: string;
        DB_DATABASE: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;

        PAGE_SIZE: string;
    }
}
