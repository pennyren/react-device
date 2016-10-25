const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'];
const monthLongList = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const dayList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function getDaysOfMonth(year, month) {
	const date = new Date(year, month + 1, 0);
	return date.getDate();
}

export function weekDiff(year, month) {
	const date = new Date(year, month, 1);
	const week = date.getDay();
	const diff = week == 0 ? 6 : week - 1;
	return diff;
}