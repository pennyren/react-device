import React, {Component} from 'react';
import IconButton from 'components/IconButton';

class CalendarToolbar extends Component {
	changeYear = (e) => {
		const {onChange, now} = this.props;
		const isNext = e.currentTarget.firstChild.classList.contains('mdi-double-right');
		const year = isNext ? now.year + 1 : now.year - 1;
		onChange(year, now.month);
	}

	changeMonth = (e) => {
		const {onChange, now} = this.props;
		const isNext = e.currentTarget.firstChild.classList.contains('mdi-right');
		let newMonth = isNext ? now.month + 1 : now.month - 1;
		let year = now.year;

		if (now.month == 11 && isNext) {
			newMonth = 0;
			year++;
		} else if (now.month == 0 && !isNext) {
			newMonth = 11;
			year--;
		}

		onChange(year, newMonth);
	}

	changeBody = (e) => {
		const {onClick} = this.props;
		const type = +e.currentTarget.getAttribute('data-type');
		onClick(type);
	}

	render() {
		const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
  								'July', 'August', 'September', 'October', 'November', 'December'];
		const {now} = this.props;

		return (
			<div className="calendar-toolbar">
				<IconButton icon="mdi-double-left" onClick={this.changeYear} />
				<IconButton icon="mdi-left" onClick={this.changeMonth} />
				<div className="date">
					<a className="pick" onClick={this.changeBody} data-type={2}>{monthList[now.month]}</a>
					<a className="pick" onClick={this.changeBody} data-type={1}>{now.year}</a>
				</div>
				<IconButton icon="mdi-right" onClick={this.changeMonth} />
				<IconButton icon="mdi-double-right" onClick={this.changeYear} />
			</div>
		);
	}
}

export default CalendarToolbar;