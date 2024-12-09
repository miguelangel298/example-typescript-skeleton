const config = {
  port: 3000,
  /**
   * Database
   */
  database: {
    type: 'mysql',
    host: 'localhost',
    username: 'username',
    password: 'password',
    database: 'database',
    port: 3306,
    synchronize: false,
    logging: false,
    entities: [`${__dirname}/../src/services/**/*.entity{.ts,.js}`],
    migrationsTableName: 'app_migrations',
    migrations: ['dist/data/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'data/migrations',
      entitiesDir: `${__dirname}/../src/services/**/*.entity{.ts,.js}`,
    },
  },
  token: {
    secretKey: 'secret',
    expireIn: 31557600000,
  },
  gateway: {
    url: '',
  },
};

export default config;
