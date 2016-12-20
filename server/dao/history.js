import executeQuery from '../utils/executeQuery';
import BaseDao from './base';
import {getConditionQuery, getEntityMap} from '../utils/generateQuery';

class HistoryDao extends BaseDao {
	constructor() {
		super('history');
	}

	offsetHistory = async (filter, offset, size = 20) => {
		const condition = getConditionQuery(filter);
		const offsetStatement = `limit ${size} offset ${offset}`;
		const sql = `select * from "${this.entity}" ${condition} order by id desc ${offsetStatement}`;
		const result = await executeQuery(sql);
		return result.rows;
	}
}

export default HistoryDao;