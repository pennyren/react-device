import React, {Component} from 'react';
import IconButton from 'components/IconButton';

class CalendarToolbar extends Component {
	componentDidMount() {
		this.date = new Date();
	}
	changeYear = () => {
		const {onChange} = this.props;
		onChange();
	}

	changeMonth = () => {

	}

	render() {
		return (
			<div className="calendar-toolbar">
				<IconButton icon="mdi-double-left" onClick={this.changeYear}/>
				<IconButton icon="mdi-left" onClick={this.changeMonth}/>
				<div className="date">
					<a className="pick">September</a>
					<a className="pick">2016</a>
				</div>
				<IconButton icon="mdi-right" onClick={this.changeMonth}/>
				<IconButton icon="mdi-double-right" onClick={this.changeYear}/>
			</div>
		);
	}
}

export default CalendarToolbar;