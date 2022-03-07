const about = require('express').Router();
var mysql = require('mysql2');
var dbconfig = require('../config/database');


var connection = mysql.createConnection(dbconfig.connection);
connection.connect();
connection.query('USE ' + dbconfig.database);

about.post('/submit', (req,res)=>{
    existsUpdateSet(req);
    res.send(200)
})

let existsUpdateSet = async (request) =>{
    let rows = await connection.promise().query(`SELECT about_me FROM users WHERE id=${request.user.id}`)
    //console.log(rows[0])
    if (rows[0].length>0){

        let sql = `UPDATE users SET users.about_me=${request.body.text} WHERE id=${request.user.id}`;
        console.log(sql);
        connection.query(sql,function(err,results){
            //console.log("this is the console.log",results)
          })
    } else {
        let sql =`UPDATE users SET users.about_me=${request.body.text} WHERE id=${request.user.id}`
        console.log(sql);
        connection.query(sql,function(err, rows) {if(err){console.error(err)}})
    }
}

module.exports = about;