import pgPool from './connectToDb';

const executeQuery = async (sql) => {
	const client  = await pgPool.connect();
	
	try {
		const result = await client.query(sql);
		console.log(1)
		console.log(result)
		return result;
	} catch (err) {
		client.release(true);
		throw err;
	}
}

export default executeQuery;