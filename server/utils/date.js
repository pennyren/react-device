const _DEFAULT_FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss';

const moment = {
	get: function (date, format) {
		if (!format) {
			format = _DEFAULT_FORMAT_DATE;
		}
		this.init(date);

		const dateTime = format.toUpperCase().split(' ');
		const parseTime = this.parseTime;
		const parseDate = this.parseDate;

		const newDate = dateTime.map((current, index) => {
			const isTime = current.indexOf('HH') == 0;
			if (!isTime) {
				return parseDate(current);
			} else {
				return parseTime(current);
			}
		});
		return newDate.join(' ');
	},

	parseDate: function (dateFormat) {
		const timestamp = moment.timestamp;
		const date = dateFormat.replace(/YYYY|MM|DD/gi, (match) => {
			switch (match) {
				case 'YYYY':
					return timestamp.year;
				case 'MM':
					return timestamp.month;
				case 'DD':
					return timestamp.day;
				default:
					return 0;
			}
		});
		return date;
	},

	parseTime: function (timeFormat) {
		const timestamp = moment.timestamp;
		const time = timeFormat.replace(/HH|MM|SS/gi, (match) => {
				switch (match) {
				case 'HH':
					return timestamp.hours;
				case 'MM':
					return timestamp.minutes;
				case 'SS':
					return timestamp.seconds;
				default:
					return 0;
			}
		});
		return time;
	},

	init: function (dateInfo) {
		const self = this;
		let currentDate = null;
		const isDate = dateInfo instanceof Date;

		if (typeof dateInfo == 'string') {
			currentDate = new Date(dateInfo);
		} else if (!isDate) {
			currentDate = new Date();
		} else {
			currentDate = dateInfo;
		}
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1;
		const day = currentDate.getDate();
		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const seconds = currentDate.getSeconds();
		
		self.timestamp = {
			year,
			month: self.zeroize(month),
			day: self.zeroize(day),
			hours: self.zeroize(hours),
			minutes: self.zeroize(minutes),
			seconds: self.zeroize(seconds)
		};
	},

	zeroize: function(val) {
		val =  String(val);
		const zero = '0';
		return val.length == 1 ? zero + val : val;
	}
}

export default moment;