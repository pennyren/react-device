import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class NotificationDao extends BaseDao {
	constructor() {
		super('notification');
	}
}

export default NotificationDao;