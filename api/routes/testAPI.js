var express = require('express');
const router = express.Router();

const pool = require("./poolconfig.js");

let connection_proof = "___No conecto :/ chale";
pool.on('connect', client =>{
    connection_proof = "Si conecto soy el papa de Gustavo x2"
})


router.post('/', (req, res, next) => {
  next()
  
}, function(req, res) {
    const total = req.body.total;
    const lugar = req.body.lugar;
    const date = req.body.date;
    const idestado = 1;
    const descripcion = {"1": { "productid":13, "qty":15},"2": { "productid":10, "qty":8},"3": { "productid":12, "qty":10},"4": { "productid":7, "qty":9},"5": { "productid":5, "qty":5},"6": { "productid":5, "qty":13},"7": { "productid":4, "qty":10},"8": { "productid":9, "qty":15}};

    const query = { text: 'INSERT INTO orden(total,descripcion,lugar,fechasolicitada,fechaentrega,idestado) VALUES($1, $2, $3, $4, $5, $6) RETURNING *' ,
    values: [total, descripcion, lugar, date, date, idestado] }
    const response = res;
    pool.query(query, (err, res) => {
        if(err) {
        response.send(err.stack)
        } else { 
        response.render('testAPI', {orderID: res.rows[0].id, show: true, form: false})
        }
  })
})

router.use('/', (req, res) => {
  res.render('testAPI', { title: 'To-do list', show: false, form: true})
})

module.exports = router;