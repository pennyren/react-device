import userSaga from 'containers/Users/saga';
import equipmentSaga from 'containers/Equipment/saga';
import notificationSaga from 'containers/Notifications/saga';
import approvalSaga from 'containers/Approval/saga';
import historySaga from 'containers/History/saga';

function* appSagas() {
	yield [userSaga(), equipmentSaga(), notificationSaga(), approvalSaga(), historySaga()];
}

export default appSagas;

