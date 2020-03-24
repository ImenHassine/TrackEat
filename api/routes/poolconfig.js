var Pool = require('pg-pool');

const databaseConfig = { connectionString:  "postgresql://postgres:postgres@52.14.98.239:5432/trackeat"}
const pool = new Pool(databaseConfig);

module.exports = pool;
