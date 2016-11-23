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

	findEquipmentBySerialNumber = async (serialNumber) => {
		const sql = `select * from "equipment" where "serialNumber" = '${serialNumber}'`;
		const result = await executeQuery(sql);
		return result.rows[0];
	}
}

export default EquipmentDao;