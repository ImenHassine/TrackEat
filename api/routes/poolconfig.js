var Pool = require('pg-pool');

const databaseConfig = { connectionString:  "postgresql://postgres:trackeat_negocios2020@3.17.150.215:5432/trackeat"}
const pool = new Pool(databaseConfig);

module.exports = pool;
