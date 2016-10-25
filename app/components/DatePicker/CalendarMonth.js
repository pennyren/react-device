import React, {Component} from 'react';

class CalendarMonth extends Component {
	selectMonth = (e) => {
		const month = +e.currentTarget.getAttribute('data-index');
		const {onChange} = this.props;
		onChange(month);
	}

	render() {
		const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
  								'July', 'August', 'September', 'October', 'November', 'December'];
  		const {nowMonth, scrollBody} = this.props;
  		const maxScroll = 26 * 12 - 84;
  		const scroll = (nowMonth + 1) * 26 - 84;

		const monthes = monthList.map((item, index) => {
  			let props = {
  				key: index,
  				'data-index': index
  			};

  			if (nowMonth == index) {
  				props.className = 'active';
  			}

  			return <li {...props} onClick={this.selectMonth}>{item}</li>
  		});

  		if (scroll > 0 && scroll < maxScroll) {
  			scrollBody(scroll);
  		} else if (scroll >= maxScroll){
            scrollBody(maxScroll);
        }

		return (
			<ul className="calendar-month">
				{monthes}
			</ul>
		)
	}
}

export default CalendarMonth;