import express from 'express';
import ApplyDao from '../dao/apply';
import EquipmentDao from '../dao/equipment';
import UserDao from '../dao/user';
import NotificationDao from '../dao/notification';
import resetResponse from '../utils/response';
import moment from '../utils/date';

const applyDao = new ApplyDao();
const equipmentDao = new EquipmentDao();
const notificationDao = new NotificationDao();
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
	
	apply.currentOrderUserIds = [apply.approvalUserIds[0]];
	apply.currentApprovalUserId = apply.approvalUserIds[0];
	return apply;
}

const applyRoute = express.Router();

applyRoute.post('/add', async (req, res) => {
	const {apply} = req.body;
	const {type, equipmentNumber, userId} = apply;
	let isFixedAsset = false;
	let equipment = null;
	let equipmentContent = '';
	if (equipmentNumber) {
		equipment = await equipmentDao.findEquipmentBySerialNumber(equipmentNumber);
		if (!equipment) {
			res.send(resetResponse(false));
			return;
		} else {
			isFixedAsset = equipment.type == '固定资产' ? true : false;
			apply.equipmentType = equipment.type;
			equipmentContent = equipment.name + ' ' + equipment.version;
		}
	}

	const user = await userDao.get(userId);
	const finalApply =  await getFinalApply(apply, isFixedAsset);
	const newApply = await applyDao.create(finalApply);

	const finalNotification = {
		acceptUserId: finalApply.currentApprovalUserId,
		makeUserId: finalApply.userId,
		applyId: newApply.id,
		type: '审批',
		content: `${user.username}|申请了${type}|${equipmentNumber ? equipmentContent : '新设备'}`,
		read: false,
		recieve: false,
		ctime: finalApply.ctime
	}
	const newNotification = await notificationDao.create(finalNotification);

	res.send(resetResponse(true, {apply: newApply}));
});

applyRoute.get('/getCurrentApproval', async (req, res) => {
	const applyId = +req.query.id;
	const approval = await applyDao.getCurrentApproval(applyId);
	const userDevices = await userDao.getUserEquipments(approval.userId);
	approval.userDevices = userDevices;
	res.send(resetResponse(true, {current: approval}));
});

applyRoute.post('/getOffsetList', async (req, res) => {
	const {userId, offset} = req.body;
	const count = await applyDao.countApprovals(userId);
	const approvals = await applyDao.getOffsetApprovals(userId, offset);
	const hasOlder = (approvals.length + offset) < count;
	res.send(resetResponse(true, {list: approvals, hasOlder}));
});

applyRoute.post('/doApproval', async (req, res) => {
	const {applyId, content, equipment, isAgreed} = req.body;
	const currentApproval = await applyDao.get(applyId);
	let {
			userId, 
			type,
			approvalUserIds, 
			currentOrderUserIds, 
			currentApprovalUserId, 
			stepInfo, 
			currentStep
		} = currentApproval;
	const totalStep = approvalUserIds.length;
	const isLast = currentOrderUserIds.length == totalStep;
	const makeUserId = approvalUserIds[currentStep - 1];
	const approvalUser = stepInfo[currentStep - 1].title;
	let currentStatus = '';
	let notifiType = '';
	let notifiContent = '';

	if (isAgreed) {
		currentStatus = 'agreed';
		notifiType = '同意';
		notifiContent = '通过了';
	} else {
		currentStatus = 'disagreed';
		notifiType = '否决';
		notifiContent = '未通过';
	}

	//update stepInfo
	const currentStepInfo = stepInfo[currentStep - 1];
	currentStepInfo.content = content;
	currentStepInfo.status = currentStatus;

	if (isAgreed && !isLast) {
		//update next step status
		stepInfo[currentStep].status = 'unread';

		//update currentOrderUserIds
		currentOrderUserIds.push(approvalUserIds[currentStep]);

		//update currentApprovalUserId
		currentApprovalUserId = approvalUserIds[currentStep]

		//update currentStep
		currentStep ++;
	} else {
		currentStep = -1;
	}

	//update apply
	const newApplyEntiy = {
		currentOrderUserIds: currentOrderUserIds,
		currentApprovalUserId: currentApprovalUserId,
		stepInfo: JSON.stringify(stepInfo),
		currentStep: currentStep
	};

	//create notification
	const notificationEntity = {
		acceptUserId: userId,
		makeUserId: makeUserId,
		applyId: applyId,
		type: notifiType,
		content: `您申请${type}${equipment}|${notifiContent}|${approvalUser}`,
		read: false,
		recieve: false,
		ctime: moment.get()
	};
	const newApply = await applyDao.update(applyId, newApplyEntiy);
	const notification = await notificationDao.create(notificationEntity);
	const finalApply = await applyDao.getCurrentApproval(applyId);
	const userDevices = await userDao.getUserEquipments(finalApply.userId);
	finalApply.userDevices = userDevices;
	res.send(resetResponse(true, {apply: finalApply}));
});

export default applyRoute;