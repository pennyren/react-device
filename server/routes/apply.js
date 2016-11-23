import express from 'express';
import ApplyDao from '../dao/apply';
import EquipmentDao from '../dao/equipment';
import resetResponse from '../utils/response';

const applyRoute = express.Router();
const applyDao = new ApplyDao();
const equipmentDao = new EquipmentDao();

applyRoute.post('/add', async (req, res) => {
	const {apply} = req.body;
	const equipmentNumber = apply.equipmentNumber;

	if (equipmentNumber) {
		const equipment = await equipmentDao.findEquipmentBySerialNumber(equipmentNumber);
		if (!equipment) {
			res.send(resetResponse(false));
			return;
		}
	}

	apply.approvalUserIds = [1, 3, 5];
	apply.currentApprovalUserId = 2;
	apply.stepInfo = {};
	apply.currentStep = 1;
	res.send(resetResponse(true, {apply: apply}));
});

function getInitStepInfoJSON(type) {
	const applyType = ['购买', '领用', '退还', '维修', '维护'];
	switch(applyType.indexOf(type)) {
		
	}
}

export default applyRoute;