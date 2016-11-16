import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class EquipmentDao extends BaseDao {
	constructor() {
		super('equipment');
	}

	batchDelete = async (ids) => {
		const sql = `delete from "equipment" where id in (${ids.join(', ')})`;
		await executeQuery(sql);
	}
}

export default EquipmentDao;