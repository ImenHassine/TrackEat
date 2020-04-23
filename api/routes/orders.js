var express = require('express');
var router = express.Router();
const pool = require("./poolconfig.js");

let connection_proof = "___No conecto :/ chale";
pool.on('connect', client =>{
    connection_proof = "Si conecto soy el papa de Gustavo x2"
})

//obtenie las ordenes de un usuario por userId
router.get("/userId/:userId",function(req, res, next){
    next();
}, function(req, res) {

  const params = req.params
  const userId = params.userId;

  const query = { text: 'select o.idusr, o.total , o.total, o.fechasolicitada, o.fechaentrega, o.descripcion, o.idestado , e.nombre , e.nombre from orden o left join estado e on o.idestado = e.id left join establecimiento l on o.lugar = l.id where o.idusr = $1' ,
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

//obtiene el nombre de un producto por su id 
router.get("/productId/:productId",function(req, res, next){
  next();
}, function(req, res) {

  const params = req.params
  const productId = params.productId;
  const query = { text: 'SELECT nombre FROM producto WHERE productId = $1' ,
  values: [productId] }
  const response = res;
  pool.query(query, (err, res) => {
    if(err) {
      response.send(err.stack)
    } else { 
      response.send(res.rows[0])
    }
  })
})

//actualiza una orden
router.get("/newState/:newState/orderId/:orderId",function(req, res, next){
  next();
}, function(req, res) {

  const params = req.params
  const newState = params.newState;
  const orderId = params.orderId;
  const query = { text: 'update orden set idestado = $1 where id = $2' ,
  values: [newState, orderId] }
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