import pgPool from './connectToDb';

const executeQuery = (sql) => {
	try {
		return pgPool.query(sql);
	} catch (err) {
		throw err;
	}
}

export default executeQuery;