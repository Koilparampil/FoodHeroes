// config/database.js
require('dotenv').config();
module.exports = {
    'connection': {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        port: 3306
    },
	'database': process.env.DB_NAME,
    'users_table': 'users'
};