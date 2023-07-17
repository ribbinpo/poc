type DBType = 'postgres' | 'mysql';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4001,
  database: {
    type: (process.env.DB_TYPE as DBType) || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*.js'],
  },
});
