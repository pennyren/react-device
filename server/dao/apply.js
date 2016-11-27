import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class ApplyDao extends BaseDao {
	constructor() {
		super('apply');
	}
}

export default ApplyDao;