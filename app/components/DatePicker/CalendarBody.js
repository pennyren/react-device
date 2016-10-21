import React, {Component} from 'react';
import {getDaysOfMonth, weekDiff} from './dateUtils';

class CalendarBody extends Component {
	changeDay = (e) => {
		const day = +e.currentTarget.lastChild.textContent;
		if (day != this.props.now.active.split('-')[2]) {
			this.props.onChange(day);
		}
	}

	getDays(now) {
		const days = [];
		const diff = weekDiff(now.year, now.month);
		const rest = diff + getDaysOfMonth(now.year, now.month);
		const active = now.active.split('-');
		const conditionOne = (active[0] == now.year && active[1] == (now.month + 1)) ? true : false;
		let day = 1;
		let isNull = true;
		
		for(let start = 1; start < 43; start++) {
			let props = {
				className: 'day',
				key: start
			}
			
			if (start > diff && start <= rest) {
				isNull = false;
				if (conditionOne && active[2] == day) {
					props.className = 'day' + ' active';
				}
				props.onClick = this.changeDay;
			} else {
				props.className = 'day' + ' prevent';
				isNull = true;
			}

			days.push(
				<div {...props}>
					<div className="circle"></div>
					<span>{isNull ? '' : day++}</span>
				</div>
			)
		}
		return days;
	}
	
	render() {
		const weekList = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
		const week = weekList.map((item, index) => <span key={index}>{item}</span>);
		const {now} = this.props;
		const days = this.getDays(now);

		return (
			<div className="calendar">
				<div className="week">
					{week}
				</div>
				<div className="days clearfix">
					{days}
				</div>
			</div>
		)
	}
}

export default CalendarBody;