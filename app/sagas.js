import userSaga from 'containers/Users/saga';

function* appSagas() {
	yield [userSaga()];
}

export default appSagas;

