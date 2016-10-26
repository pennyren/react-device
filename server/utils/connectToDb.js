const PgPool = require('pg').Pool;
const config = {
	host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1213',
    database: 'reactEMS'
}
const pool = new PgPool(config);

pool.on('error', (err, client) => {
	throw err;
});

module.exports = pool;