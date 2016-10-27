import {Pool} from 'pg';

const config = {
	host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1213',
    database: 'reactEMS'
}

process.on('unhandledRejection', function(e) {
  	console.log(e.message, e.stack);
});

const pgPool = new Pool(config);
pgPool.on('error', (err, client) => {
	throw err;
});

export default pgPool;