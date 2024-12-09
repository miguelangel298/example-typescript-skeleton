const config = {
  port: 3000,
  database: {
    synchronize: false,
    host: 'localhost',
    username: 'username',
    password: 'password',
    database: 'database',
    port: 1433,
  },
  token: {
    secretKey: process.env.SECRETKEY,
    expireIn: 7890000,
  },

};

export default config;
