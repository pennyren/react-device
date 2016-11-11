import userSaga from 'containers/Users/saga';
import equipmentSaga from 'containers/Equipment/saga';

function* appSagas() {
	yield [userSaga(), equipmentSaga()];
}

export default appSagas;

