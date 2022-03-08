const res = require('express').Router();
var mysql = require('mysql2');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.connect();
connection.query('USE ' + dbconfig.database);

res.post('/submit', (req,res) =>{
    //console.log(req.body)
    //console.log(req.user)
    existsUpdateSet(req);
    res.send(200)
})























let existsUpdateSet = async (request) =>{
    let rows = await connection.promise().query(`SELECT * FROM restaurants WHERE restaurant_name = "${request.body.restaurantName}" AND user_id='${request.user.id}'`)
    //console.log(rows[0])
    if (rows[0].length>0){

        let sql = `UPDATE restaurants SET restaurants.has_been=${request.body.boolVal} WHERE restaurant_name="${request.body.restaurantName}" AND user_id='${request.user.id}'`;
        console.log(sql);
        connection.query(sql,function(err,results){
            //console.log("this is the console.log",results)
          })
    } else {
        let sql =`INSERT INTO restaurants (restaurant_name,has_been,user_id) VALUES ("${request.body.restaurantName}",${request.body.boolVal},${request.user.id})`
        console.log(sql);
        connection.query(sql,function(err, rows) {if(err){console.error(err)}})
    }
}




module.exports = res;