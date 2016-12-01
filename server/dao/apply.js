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
			a.id, a."currentApprovalUserId", u.username, a.type, a."equipmentNumber" as number, e.name, e.version, a.ctime
			from "apply" a
			left join "user" u on u.id = a."userId" 
			left join "equipment" e on a."equipmentNumber" = e."serialNumber"
			where ${userId} = any (a."approvalUserIds")
			limit 10 offset ${offset}
		`;
		const result = await executeQuery(sql);
		return result.rows;
	}
}

export default ApplyDao;