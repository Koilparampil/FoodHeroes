/**
 * Created by barrett on 8/28/14.
 * modified by koilparampil 3/4/21.
 */
//if you need to create the databse run this script with node ./scripts/create_database
var mysql = require('mysql2');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);
//creates the table
connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(60) NOT NULL, \
    `password` CHAR(60), \
    `first_name` VARCHAR(60),\
    `last_name` VARCHAR(60),\
    `about_me` LONGTEXT,\
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');
//creates the restaurants table 
connection.query(`CREATE TABLE ${dbconfig.database}.${dbconfig.res_table} (
    id INT NOT NULL AUTO_INCREMENT, 
    restaurant_name VARCHAR(100) NOT NULL,
    has_been BOOL NOT NULL,
    user_id INT,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
    )`)



console.log('Success: Database Created!')

connection.end();
