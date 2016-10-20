import React, {Component} from 'react';

class CalendarBody extends Component {
	getDays() {
		const days = [];
		for(let i = 1; i < 43; i ++) {
			days.push(
				<div className="day" key={i}>
					<div className="circle"></div>
					<span>{i}</span>
				</div>
			)
		}
		return days;
	}
	render() {
		const weekList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		const week = weekList.map((item, index) => <span key={index}>{item}</span>);
		const days = this.getDays();

		return (
			<div className="calendar">
				<div className="week">
					{week}
				</div>
				<div className="days">
					{days}
				</div>
			</div>
		)
	}
}

export default CalendarBody;