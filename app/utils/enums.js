 let _enumsInfo = {};

 _enumsInfo.userRole = {
 	'Teacher': '教师',
 	'Director': '主任',
 	'Dean': '院长',
 	'FundAdmin': '经费管理员',
 	'SystemAdmin': '系统管理员'
 }

 const getEnumVal = (type, val) => {
 	const currentEnum = _enumsInfo[type];
 	const keys = Object.keys(currentEnum);
 	const values = keys.map((val) => currentEnum[val]);
 	const index = keys.indexOf(val);
 	return index !== -1 ? currentEnum[val] : keys[values.indexOf(val)];
 }

 export default getEnumVal;