import pgPool from './connectToDb';

const executeQuery = async (sql) => {
	return pgPool.query(sql);
	const client  = await pgPool.connect();
	
	try {
		const result = await client.query(sql);
		return {
			success: true,
			result: result.rows
		};
	} catch (err) {
		client.release(true);
		throw err;
	}
}

export default executeQuery;