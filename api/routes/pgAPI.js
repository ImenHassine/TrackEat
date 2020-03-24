var Pool = require('pg-pool');
var express = require('express');
var router = express.Router();
//require ('dotenv').config();

const databaseConfig = { connectionString: "postgresql://postgres:postgres@52.14.98.239:5432/trackeat" };
const pool = new Pool(databaseConfig);
let connection_proof = "___No conecto :/ chale";
pool.on('connect', client =>{
    connection_proof = "Si conecto soy el papa de Gustavo"
})

router.get("/",function(req, res, next){
    res.send(connection_proof);
})
/*pool.query('SELECT * FROM usuario', (err, res) => {
  console.log(err, res)
  pool.end()
})*/
pool.end();
module.exports = router;

