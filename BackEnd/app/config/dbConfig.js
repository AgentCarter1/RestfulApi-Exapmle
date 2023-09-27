
require('dotenv').config({path:'./dbInfo.env'});
console.log(process.env.DB_HOST);
const config = {
  HOST: "localhost" ,
  port: "5432" ,
  USER: "admin" ,
  PASSWORD: "123",
  DB: "pinaccess",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = config;