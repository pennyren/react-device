import express from 'express';
import ApplyDao from '../dao/apply';
import EquipmentDao from '../dao/equipment';
import UserDao from '../dao/user';
import resetResponse from '../utils/response';

const applyDao = new ApplyDao();
const equipmentDao = new EquipmentDao();
const userDao = new UserDao();

const applyType = ['购买', '维修', '领用', '维护', '退还'];
const approval = {
	most: {
		roles: ['主任', '系统管理员', '经费管理员', '院长'],
		flows: ['科室审批', '管理员审批', '经费管理员审批', '院长审批']
	},
	middle: {
		roles: ['系统管理员', '经费管理员'],
		flows: ['管理员审批', '经费管理员审批']
	},
	least: {
		roles: ['系统管理员'],
		flows: ['管理员审批']
	}
}

const getFinalApply = async (apply, isFixedAsset) => {
	const {type} = apply;
	const infoStatus = ['unread', 'disabled'];
	const typeIndex = applyType.indexOf(type);
	const mostInfoFlow = approval.most.flows.map((flow, index) => {
		const status = index == 0 ? infoStatus[0] : infoStatus[1];
		return {
			title: flow,
			status: status,
			content: ''
		}
	});
	const middleInfoFlow = approval.middle.flows.map((flow, index) => {
		const status = index == 0 ? infoStatus[0] : infoStatus[1];
		return {
			title: flow,
			status: status,
			content: ''
		}
	});
	const leastInfoFlow = [{
		title: '管理员审批',
		status: 'unread',
		content: ''
	}];
	apply.currentStep = 1;

	if (typeIndex < 2) {
		apply.stepInfo = JSON.stringify(mostInfoFlow);
		apply.approvalUserIds = await userDao.findIdsByRoles(approval.most.roles);
	} else if (typeIndex == 2) {
		if (isFixedAsset) {
			apply.stepInfo = JSON.stringify(middleInfoFlow);
			apply.approvalUserIds = await userDao.findIdsByRoles(approval.middle.roles);
		} else {
			apply.stepInfo = JSON.stringify(leastInfoFlow);
			apply.approvalUserIds = await userDao.findIdsByRoles(approval.least.roles);
		}
	} else {
		apply.stepInfo = JSON.stringify(leastInfoFlow);
		apply.approvalUserIds = await userDao.findIdsByRoles(approval.least.roles);
	}

	apply.currentApprovalUserId = apply.approvalUserIds[0];
	return apply;
}

const applyRoute = express.Router();

applyRoute.post('/add', async (req, res) => {
	const {apply} = req.body;
	let isFixedAsset = false;

	if (apply.equipmentNumber) {
		const equipment = await equipmentDao.findEquipmentBySerialNumber(apply.equipmentNumber);
		if (!equipment) {
			res.send(resetResponse(false));
			return;
		} else {
			isFixedAsset = equipment.type == '固定资产' ? true : false;
		}
	}

	const finalApply =  await getFinalApply(apply, isFixedAsset);
	const newApply = await applyDao.create(finalApply);
	res.send(resetResponse(true, {apply: newApply}));
});

export default applyRoute;