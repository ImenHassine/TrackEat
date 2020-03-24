import { Pool } from 'pg';
var express = require('express');
var router = express.Router();
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);
let connection_proof = "No conecto :/ chale";
pool.on('connect',() =>{
    connection_proof = "Si conecto soy el papa de Gustavo"
})


router.get("/",function(req, res, next){
    res.send(connection_proof);
})

module.exports = router;