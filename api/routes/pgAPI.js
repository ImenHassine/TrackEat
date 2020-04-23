var express = require('express');
var router = express.Router();
const pool = require("./poolconfig.js");

let connection_proof = "___No conecto :/ chale";
pool.on('connect', client =>{
    connection_proof = "Si conecto soy el papa de Gustavo x2"
})


//crea el nuevo usuario y guarda su informacion en la base de datos
router.get("/email/:email/password/:password/image/:image/name/:name",function(req, res, next){
    next();
}, function(req, res) {

  const params = req.params
  const email = params.email;
  const password = params.password;
  const name = params.name;
  const image = params.image;

  const query = { text: 'INSERT INTO usuario(nombre,email,password,image) VALUES($1, $2, $3, $4) RETURNING *' ,
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

/*
    obtener informacion de un usuario 
 */

router.get("/password/:password/email/:email",function(req, res, next){
  next();
}, function(req, res) {

  const params = req.params
  const email = params.email;
  const password = params.password;
  const query = { text: 'SELECT id, email, nombre, image FROM usuario WHERE email = $1 and password = $2' ,
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

//obtener los puntos de un usuario
router.get("/userId/:userId",function(req, res, next){
  next();
}, function(req, res) {

  const params = req.params
  const userId = params.userId;
  const query = { text: 'SELECT puntos FROM usuario WHERE id = $1' ,
  values: [userId] }
  const response = res;
  pool.query(query, (err, res) => {
    if(err) {
      response.send(err.stack)
    } else { 
      response.send(res.rows[0])
    }
  })
})

//obtener canjeables dada la cantidad de puntos de un usuario
router.get("/puntos/:puntos",function(req, res, next){
  next();
}, function(req, res) {

  const params = req.params
  const puntos = params.puntos;
  const query = { text: 'SELECT descripcion FROM canjeables WHERE cantidad = $1' ,
  values: [puntos] }
  const response = res;
  pool.query(query, (err, res) => {
    if(err) {
      response.send(err.stack)
    } else { 
      response.send(res.rows[0])
    }
  })
})


//obtener canjeables dada la cantidad de puntos de un usuario
router.get("/puntos/:puntos",function(req, res, next){
  next();
}, function(req, res) {

  const params = req.params
  const puntos = params.puntos;
  const query = { text: 'SELECT descripcion FROM canjeables WHERE cantidad = $1' ,
  values: [puntos] }
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
