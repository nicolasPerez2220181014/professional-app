module.exports = {
    development: {
      username: process.env.DB_USER || 'myuser',
      password: process.env.DB_PASSWORD || 'mypassword',
      database: process.env.DB_NAME || 'mydb',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
    },
    test: {
      username: 'root',
      password: null,
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    production: {
      username: 'root',
      password: null,
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
  };
  