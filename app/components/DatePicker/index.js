import React, {Component} from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import ClickAway from 'internals/ClickAway';
import CalendarToolbar from './CalendarToolbar';
import FlatButton from 'components/FlatButton';
import CalendarBody from './CalendarBody';
import CalendarYear from './CalendarYear';
import CalendarMonth from './CalendarMonth';
import styles from './styles.css';

class Calendar extends Component {
	state = {
		bodyType: 0,
		currentYear: this.props.now.year,
		currentMonth: this.props.now.month,
		active: this.props.now.active
	}

	componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }
	
	componentWillEnter(callback) {
        this.initAnimation(callback);
    }

    componentDidEnter() {
        this.animate();
    }

    componentWillLeave(callback) {
    	const style = this.calendar.style;
    	style.transform = 'scaleY(0)';
		style.opacity = 0;
        this.leaveTimer = setTimeout(callback, 100);
    }
	
	animate() {
		const style = this.calendar.style;
		style.transform = 'scaleY(1)';
		style.opacity = 1;
		style.transition = 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 600ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
	}

	initAnimation(callback) {
		const style = this.calendar.style;
		style.transformOrigin = 'left top 0px';
		style.transform = 'scaleY(0)';
		style.opacity = 0;
		this.enterTimer = setTimeout(callback, 0);
	}

	changeCalendarBody = (type) => {
		this.setState({bodyType: type});
	}

	changeCalendarMonth = (month) => {
		this.setState({bodyType: 0, currentMonth: month});
	}

	changeCalendarYear = (year) => {
		this.setState({bodyType: 0, currentYear: year});
	}

	changeCalendarAll = (year, month) => {
		this.setState({bodyType: 0, currentYear: year, currentMonth: month});
	}

	changeActive = (day) => {
		const year = this.state.currentYear;
		const month = this.state.currentMonth + 1;
		this.setState({active: year + '-' + month + '-' + day})
	}

	getCalendarBody(date) {
		switch (this.state.bodyType) {
			case 1:
				return <CalendarYear 
							nowYear={date.year}
							onChange={this.changeCalendarYear}
							scrollBody={this.scrollCalendarBody}
						/>;
			case 2: 
				return <CalendarMonth 
							nowMonth={date.month}
							onChange={this.changeCalendarMonth}
							scrollBody={this.scrollCalendarBody}
						/>;
			default:
				return <CalendarBody now={date} onChange={this.changeActive}/>;
		}
	}

	fillDate = () => {
		const {close, setVal} = this.props;
		setVal(this.state.active);
		close();
	}

	scrollCalendarBody = (scrollTop) => {
		console.log(scrollTop)
		console.log(this.calendar);
		/*this.calendarBody.scrollTop = scrollTop;*/
	}

	render() {
		const {close} = this.props;
		const date = {
			year: this.state.currentYear,
			month: this.state.currentMonth,
			active: this.state.active,
		};
		const body = this.getCalendarBody(date);
		
		return (
			<ClickAway onClickAway={close} hierarchy={2}>
				<div className="date-display" ref={r => this.calendar = r}>
					<CalendarToolbar 
						onClick={this.changeCalendarBody}
						onChange={this.changeCalendarAll}
						now={date}
					/>
					<div className="calendar-body" ref={r => this.calendarBody = r}>
						{body}
					</div>
					<div className="calendar-action clearfix">
						<FlatButton onClick={this.fillDate}>确定</FlatButton>
						<FlatButton onClick={close}>取消</FlatButton>
					</div>
				</div>
			</ClickAway>
		);
	}
}

class DatePicker extends Component {
	state = {
		open: false
	}

	open = () => {
		const date = new Date();
		const val = this.input.value;
		if (val == '') {
			this.now = {
				year: date.getFullYear(),
				month: date.getMonth(),
				day: date.getDate()
			}
			this.now.active = this.now.year + '-' + (this.now.month + 1) + '-' + this.now.day;

		} else {
			let current = val.split('-');
			this.now = {
				year: +current[0],
				month: +current[1] - 1,
				day: +current[2],
				active: val
			}
		}

		this.setState({open: true});
	}

	close = () => {
		this.setState({open: false});
	}

	setVal = (val) => {
		this.input.value = val;
	}

	render() {
		const {name} = this.props;
		
		return (
			<div className="datepicker">
				<div className="date-select">
					<input className="date-input"
						   placeholder="Select date"
						   readOnly={true}
						   name={name}
						   onClick={this.open}
						   ref={r => this.input = r}
					/>
					<i className="mdi mdi-calendar"></i>
				</div>
				<ReactTransitionGroup component="div">
					{this.state.open && <Calendar 
											close={this.close}
											now={this.now}
											setVal={this.setVal}
										/>}
				</ReactTransitionGroup>
			</div>
		)
	}
}

export default DatePicker;