declare namespace NodeJS {
    interface ProcessEnv {
        // APP
        PAGE_SIZE: string;

        // DB
        DB_HOST: string;
        DB_PORT: string;
        DB_DATABASE: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
    }
}
