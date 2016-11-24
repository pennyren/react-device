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
	lease: {
		roles: ['系统管理员'],
		flows: ['管理员审批']
	}
}

const getStepInfo = (type, isFixedAsset) => {
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
	if (typeIndex < 2) {
		return JSON.stringify(mostInfoFlow);
	} else if (typeIndex == 2) {
		return isFixedAsset ? JSON.stringify(middleInfoFlow) : JSON.stringify(leastInfoFlow);
	} else {
		return JSON.stringify(leastInfoFlow); 
	}
}

const getUserIds = async (type) => {
	const typeIndex = applyType.indexOf(type);
}

const getCurrentUserId = async (type) => {
	const typeIndex = applyType.indexOf(type);
}

const applyRoute = express.Router();

applyRoute.post('/add', async (req, res) => {
	const {apply} = req.body;
	const {type, equipmentNumber} = apply;
	let isFixedAsset = false;

	if (equipmentNumber) {
		const equipment = await equipmentDao.findEquipmentBySerialNumber(equipmentNumber);
		if (!equipment) {
			res.send(resetResponse(false));
			return;
		} else {
			isFixedAsset = equipment.type == '固定资产' ? true : false;
		}
	}

	apply.currentStep = 1;
	apply.approvalUserIds = await getUserIds(type);
	apply.currentApprovalUserId = await getCurrentUserId(type);
	apply.stepInfo = getStepInfo(type, isFixedAsset);
	
	res.send(resetResponse(true, {apply: apply}));
});

export default applyRoute;