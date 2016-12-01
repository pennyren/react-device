import executeQuery from '../utils/executeQuery';
import BaseDao from './base';

class ApplyDao extends BaseDao {
	constructor() {
		super('apply');
	}

	getOffsetList = async (filter, currentCount) => {
		
	}
}

export default ApplyDao;