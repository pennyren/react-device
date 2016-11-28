import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class HistoryDao extends BaseDao {
	constructor() {
		super('history');
	}
}

export default HistoryDao;