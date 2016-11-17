import React, {Component} from 'react';

class CalendarMonth extends Component {
    componentDidMount() {
        const {nowMonth, scrollBody} = this.props;
        const maxScroll = 26 * 12 - 172;
        const scroll = (nowMonth + 1) * 26;
        const finalScroll = scroll >= maxScroll ? maxScroll : scroll;
        scrollBody(finalScroll);
    }

	selectMonth = (e) => {
		const month = +e.currentTarget.getAttribute('data-index');
		const {onChange} = this.props;
		onChange(month);
	}

	render() {
		const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
  								'July', 'August', 'September', 'October', 'November', 'December'];
  		const {nowMonth} = this.props;
  		const monthes = monthList.map((item, index) => {
  			let props = {
  				key: index,
  				'data-index': index
  			};
            nowMonth == index && (props.className = 'active')
  			return <li {...props} onClick={this.selectMonth}>{item}</li>
  		});

  		return (
			<ul className="calendar-month">
				{monthes}
			</ul>
		)
	}
}

export default CalendarMonth;