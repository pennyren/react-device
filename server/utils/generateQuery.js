function getConditionQuery(filter) {
	if (filter) {
		const filterMap = filter.map((item) => item.key + item.operator + item.val);
		filter = 'where ' + filterMap.join(' and ');
	}
	return filter;
}

function getEntityMap(entity, isMap = true) {
	const keys = Object.keys(entity);
	const values = keys.map((key, index) => {
		const val = entity[key];
		const finalVal = typeof val == 'string' ? `'${val}'` : val;
		return isMap ? `${key} = ${finalVal}` : finalVal;
	});
	return isMap ? values.join(',') : {keys: keys.join(','), values: values.join(',')};
}

export {getConditionQuery, getEntityMap};