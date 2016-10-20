import React, {Component} from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import ClickAway from 'internals/ClickAway';
import CalendarToolbar from './CalendarToolbar';
import FlatButton from 'components/FlatButton';
import CalendarBody from './CalendarBody';
import styles from './styles.css';

class Calendar extends Component {
	state = {
		bodyType: true
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

	changeCalendarBody = () => {
		this.setState({bodyType: !this.state.bodyType})
	}

	render() {
		const {close} = this.props;
		console.log('rerender');
		return (
			<ClickAway onClickAway={close} hierarchy={2}>
				<div className="date-display" ref={r => this.calendar = r}>
					<CalendarToolbar onChange={this.changeCalendarBody}/>
					<div className="calendar-body">
						<CalendarBody />
					</div>
					<div className="calendar-action clearfix">
						<FlatButton>确定</FlatButton>
						<FlatButton>取消</FlatButton>
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
		this.setState({open: true});
	}

	close = () => {
		this.setState({open: false});
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
					/>
					<i className="mdi mdi-calendar"></i>
				</div>
				<ReactTransitionGroup component="div">
					{this.state.open && <Calendar close={this.close}/>}
				</ReactTransitionGroup>
			</div>
		)
	}
}

export default DatePicker;