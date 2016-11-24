import express from 'express';
import ApplyDao from '../dao/apply';
import EquipmentDao from '../dao/equipment';
import UserDao from '../dao/user';
import resetResponse from '../utils/response';

const applyDao = new ApplyDao();
const equipmentDao = new EquipmentDao();
const userDao = new UserDao();

const getStepInfoJSON = (type, isFixedAsset) => {
	const applyType = ['购买', '维修', '领用', '维护', '退还'];
	const infoStatus = ['unread', 'disabled'];
	const infoFlowOne = ['科室审批', '管理员审批', '经费管理员审批', '院长审批'].map((flow, index) => {
		const status = index == 0 ? infoStatus[0] : infoStatus[1];
		return {
			title: flow,
			status: status,
			content: ''
		}
	});
	const infoFlowTwo = ['管理员审批', '经费管理员审批'].map((flow, index) => {
		const status = index == 0 ? infoStatus[0] : infoStatus[1];
		return {
			title: flow,
			status: status,
			content: ''
		}
	});
	const infoFlowThr = [{
		title: '管理员审批',
		status: 'unread',
		content: ''
	}];
	
	const typeIndex = applyType.indexOf(type);
	if (typeIndex < 2) {
		return JSON.stringify(infoFlowOne);
	} else if (typeIndex == 2) {
		return isFixedAsset ? JSON.stringify(infoFlowTwo) : JSON.stringify(infoFlowThr);
	} else {
		return JSON.stringify(infoFlowThr); 
	}
}

const getUserIds = async (type) => {

}

const getCurrentUserId = async (type) => {

}

const applyRoute = express.Router();

applyRoute.post('/add', async (req, res) => {
	const {apply} = req.body;
	const {type, equipmentNumber} = apply;
	const isFixedAsset = false;

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
	apply.stepInfo = getStepInfoJSON(type, isFixedAsset);
	
	res.send(resetResponse(true, {apply: apply}));
});

export default applyRoute;