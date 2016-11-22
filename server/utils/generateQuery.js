function getConditionQuery(filter) {
	if (filter) {
		const filterMap = filter.map((item) => item.key + item.operator + item.val);
		filter = 'where ' + filterMap.join(' and ');
	}
	return filter;
}

function getEntityMap(entity, isMap = true) {
	const hyphenateRE = /([a-z\d])([A-Z])/;
	const keys = Object.keys(entity);
	const values = keys.map((key, index) => {
		const finalVal = typeof entity[key] == 'string' ? `'${entity[key]}'` : entity[key];
		hyphenateRE.test(key) && (keys[index] = `"${key}"`);
		return isMap ? `${keys[index]} = ${finalVal}` : finalVal;
	});
	return isMap ? values.join(',') : {keys: keys.join(','), values: values.join(',')};
}

export {getConditionQuery, getEntityMap};