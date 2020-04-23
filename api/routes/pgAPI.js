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
/*
  obtener todas las ordenes de un usuario determinado 
*/
router.get("/orders/userId/:userId", function(req, res, next) {
  next();
}, function(req, res) {
  const params = re.params
  const userid = params.userId
  const query = { text: 'SELECT * FROM orden WHERE idUsr = $1', values: [userid] }
  const response = res
  pool.query(query, (err, res) => {
    if(err){
      response.send(err.stack)
    } else {
      response.send(res.rows[0])
    }
  })
})

/*
  obtener el nombre de un producto
*/
router.get("/orders/productId/:productId", function(req, res, next) {
  next();
}, function(req, res) {
  const params = re.params
  const userid = params.userId
  const query = { text: 'SELECT nombre FROM producto WHERE id = $1', values: [userid] }
  const response = res
  pool.query(query, (err, res) => {
    if(err){
      response.send(err.stack)
    } else {
      response.send(res.rows[0])
    }
  })
})

/*
  obtener el nombre de un producto
*/
router.get("/orders/productId/:productId", function(req, res, next) {
  next();
}, function(req, res) {
  const params = re.params
  const productid = params.productId
  const query = { text: 'SELECT nombre FROM producto WHERE id = $1', values: [productid] }
  const response = res
  pool.query(query, (err, res) => {
    if(err){
      response.send(err.stack)
    } else {
      response.send(res.rows[0])
    }
  })
})
/**
 *  Obtener los puntos de un usuario 
 */
router.get("/pgAPI/userId/:userId", function(req, res, next) {
  next();
}, function(req, res) {
  const params = re.params
  const userid = params.userId
  const query = { text: 'SELECT puntos FROM usuario WHERE id = $1', values: [userid] }
  const response = res
  pool.query(query, (err, res) => {
    if(err){
      response.send(err.stack)
    } else {
      response.send(res.rows[0])
    }
  })
})

/**
 * Obtener los canjeables de un usuario 
 */

// router.get("/pgAPI/puntos/:puntos", function(req, res, next) {
//   next();
// }, function(req, res) {
//   const params = re.params
//   const userid = params.userId
//   const query = { text: 'SELECT puntos FROM usuario WHERE id = $1', values: [userid] }
//   const response = res
//   pool.query(query, (err, res) => {
//     if(err){
//       response.send(err.stack)
//     } else {
//       response.send(res.rows[0])
//     }
//   })
// })

module.exports = router;
