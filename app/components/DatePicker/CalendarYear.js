import React, {Component} from 'react';

class CalendarYear extends Component {
	selectYear = (e) => {
		const year = +e.currentTarget.getAttribute('data-year');
		const {onChange} = this.props;
		onChange(year);
	}

	render() {
		const {nowYear} = this.props;
		let start = 1916;
		let end = start + 200;
		let yearList = [];
		for (start; start <= end; start ++) {
			let props = {
  				key: start,
  				'data-year': start
  			};

  			if (nowYear == start) {
  				props.className = 'active';
  			}
  			
  			yearList.push(<li {...props} onClick={this.selectYear}>{start}</li>);
		}

		return (
			<ul className="calendar-year">
				{yearList}
			</ul>
		)
	}
}

export default CalendarYear;