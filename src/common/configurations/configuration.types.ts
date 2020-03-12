export interface IMySqlConfig {
    type: 'mysql' | 'mariadb';
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
    logging: boolean;
}
