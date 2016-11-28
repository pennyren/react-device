import userSaga from 'containers/Users/saga';
import equipmentSaga from 'containers/Equipment/saga';
import notificationSaga from 'containers/Notifications/saga';

function* appSagas() {
	yield [userSaga(), equipmentSaga(), notificationSaga()];
}

export default appSagas;

