
require('dotenv').config({path:'./dbInfo.env'});
console.log(process.env.DB_HOST);
const config = {
  HOST: process.env.DB_HOST,
  port: process.env.DB_PORT,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = config;