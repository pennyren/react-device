import React, {Component} from 'react';
import ClickAway from 'internals/ClickAway';
import styles from './styles.css';

class CompleteMenu extends Component {
	state = {
		dataSource: []
	}

	open = () => {
		this.menu.classList.add('show');
	}
	
	close = () => {
		this.menu.classList.remove('show');
	}

	onChange = (newDataSource) => {
		this.setState({dataSource: newDataSource});
	}

	filter = (val) => {
		const {onFilter} = this.props;
		typeof onFilter == 'function' && onFilter(val, this.onChange);
	}

	render() {
		const {dataSource} = this.state;
		const isShow = dataSource.length != 0;
		return (
			<ClickAway onClickAway={this.close} hierarchy={1}>
				<div className="menu" ref={r => this.menu = r}>
					<ul>
						{isShow && dataSource.map((item, index) => {
							return (
								<li className="item" key={index} onClick={this.props.setValue}>
									<Ripple color="#bababa"/>
									{item}
								</li>
							)
						})}
					</ul>
				</div>
			</ClickAway>
		)
	}
}

class AutoComplete extends Component {
	static defaultProps = {
		isFloat: true
	}
	
	isFocus = () => {
		this.textfield.classList.add('is-focus');
		this.props.isFloat && this.textfield.classList.add('is-float');
	}

	isBlur = () => {
		const classList = this.textfield.classList;
		classList.remove('is-focus');
		if (!classList.contains('is-dirty') && this.props.isFloat) {
			classList.remove('is-float');
		}
	}

	checkDirty = (e) => {
		const {filter} = this.props;
		const val = this.input.value;
		const classList = this.textfield.classList;
		if (val) {
			classList.add('is-dirty');
			this.menu.filter(val);
			this.menu.open();
		} else {
			classList.remove('is-dirty');
			this.menu.close();
		}
	}

	setValue = (e) => {
		const val = e.currentTarget.textContent;
		this.input.value(val);
		this.menu.close();
	} 

	render() {
		const {name, value, placeholder, isFloat, onFilter} = this.props;
		
		let classList = ['auto-textfield'];
		isFloat && classList.push('auto-textfield-float');

		if (value) {
			classList.push('is-dirty');
			if (isFloat) {
				classList.push('is-float');
			}
		}

		return (
			<div className="auto-complete">
				<div className={classList.join(' ')} ref={r => this.textfield = r}>
					<input 
						className="auto-textfield-input"
						type="text"
						name={name}
						id={name}
						defaultValue={value}
						onFocus={this.isFocus}
		   				onBlur={this.isBlur}
		   				onChange={this.checkDirty}
		   				ref={r => this.input = r}
					/>
					<label className="auto-textfield-label" htmlFor={name}>{placeholder}</label>
				</div>
				<CompleteMenu
					setValue={this.setValue}
					onFilter={onFilter}
					ref={r => this.menu = r}
				/>
			</div>
		)
	}
}

export default AutoComplete;