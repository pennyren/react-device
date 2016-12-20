import executeQuery from '../utils/executeQuery';
import BaseDao from './base';
import {getConditionQuery, getEntityMap} from '../utils/generateQuery';

class NotificationDao extends BaseDao {
	constructor() {
		super('notification');
	}

	offsetNotifications = async (filter, offset, size = 20) => {
		const condition = getConditionQuery(filter);
		const offsetStatement = `limit ${size} offset ${offset}`;
		const sql = `select * from "${this.entity}" ${condition} order by id desc ${offsetStatement}`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	readAll = async (ids) => {
		const sql = `update "${this.entity}" set read = true where id in (${ids.join(', ')})`;
		await executeQuery(sql);
	}
}

export default NotificationDao;