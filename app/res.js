const res = require('express').Router();

res.post('/submit', (req,res) =>{
    console.log(req.body)
    console.log(req.user)
})
module.exports = res;