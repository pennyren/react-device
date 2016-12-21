import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class ApplyDao extends BaseDao {
	constructor() {
		super('apply');
	}

	getCurrentApproval = async (applyId) => {
		const sql = `
			select 
			a.*, u.username, e.name, e.version
			from "apply" a
			left join "user" u on u.id = a."userId" 
			left join "equipment" e on a."equipmentNumber" = e."serialNumber"
			where a.id = ${applyId}
		`;
		const result = await executeQuery(sql);
		return result.rows[0];
	}

	getOffsetApprovals = async (userId, offset) => {
		const sql = `
			select 
			a.id, a."currentApprovalUserId", a."currentOrderUserIds", a."currentStep", u.username, a.type, a."equipmentNumber" as number, e.name, e.version, a.ctime
			from "apply" a
			left join "user" u on u.id = a."userId" 
			left join "equipment" e on a."equipmentNumber" = e."serialNumber"
			where ${userId} = any (a."currentOrderUserIds")
			order by a.id desc
			limit 20 offset ${offset}
		`;
		const result = await executeQuery(sql);
		return result.rows;
	}

	countApprovals = async (userId) => {
		const sql = `select count(*) from "apply" a where ${userId} = any (a."currentOrderUserIds")`;
		const result = await executeQuery(sql);
		return +result.rows[0].count;
	}
}

export default ApplyDao;