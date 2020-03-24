var express = require('express');
var router = express.Router();
const pool = require("./poolconfig.js");

let connection_proof = "___No conecto :/ chale";
pool.on('connect', client =>{
    connection_proof = "Si conecto soy el papa de Gustavo x2"
})

router.get("/",function(req, res, next){
    res.send(connection_proof);
})

pool.query('SELECT * FROM usuario', (err, res) => {
  console.log(err, res)
  pool.end()
})

module.exports = router;
