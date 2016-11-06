const _DEFAULT_FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss';

const formatDate = (timestamp, format) => {
	if (typeof timestamp !== 'string') {
		return;
	}
	if (!format) {
		format = _DEFAULT_FORMAT_DATE;
	}

	const date = new Date(timestamp);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const dateTime = format.toUpperCase().split(' ');

	const newDate = dateTime.map((current, index) => {
		const isTime = current.indexOf('HH') == 0;
		if (!isTime) {
			const date = current.replace(/YYYY|MM|DD/gi, (match) => {
				switch (match) {
					case 'YYYY':
						return year;
					case 'MM':
						return month;
					case 'DD':
						return day;
					default:
						return 0;
				}
			})
			return date;
		} else {
			const time = current.replace(/HH|MM|SS/gi, (match) => {
				switch (match) {
					case 'HH':
						return hours;
					case 'MM':
						return minutes;
					case 'SS':
						return seconds;
					default:
						return 0;
				}
			});
			return time;
		}
	});

	return newDate.join(' ');
}

export default formatDate;