// config/database.js
require("dotenv").config();



module.exports = {
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
  },
  database: process.env.DB_NAME,
  users_table: "users",
};

