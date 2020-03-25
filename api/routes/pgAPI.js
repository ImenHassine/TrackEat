var express = require('express');
var router = express.Router();
const pool = require("./poolconfig.js");

let connection_proof = "___No conecto :/ chale";
pool.on('connect', client =>{
    connection_proof = "Si conecto soy el papa de Gustavo x2"
})

router.get("/email/:email/password/:password/image/:image/name/:name",function(req, res, next){
    next();
}, function(req, res) {

  const params = req.params
  const email = params.email;
  const password = params.password;
  const name = params.name;
  const image = params.image;

  const query = { text: 'INSERT INTO usuario(nombre,email,password,image) VALUES($1, $2, $3) RETURNING *' ,
  values: [name, email, password, image] }
  const response = res;
  pool.query(query, (err, res) => {
    if(err) {
      response.send(err.stack)
    } else { 
      response.send(res.rows[0])
    }
  })
})

router.get("/password/:password/email/:email",function(req, res, next){
  next();
}, function(req, res) {

  const params = req.params
  const email = params.email;
  const password = params.password;
  const query = { text: 'SELECT nombre, image, email FROM usuario WHERE email = $1 and password = $2' ,
  values: [email, password] }
  const response = res;
  pool.query(query, (err, res) => {
    if(err) {
      response.send(err.stack)
    } else { 
      response.send(res.rows[0])
    }
  })
})


module.exports = router;
