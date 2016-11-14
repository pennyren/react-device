import React, {Component} from 'react';
import Ripple from 'components/Ripple';
import ClickAway from 'internals/ClickAway';
import styles from './styles.css';

class SelectField extends Component {
	state = {
		value: this.props.value ? this.props.value : this.props.menuItems[0]
	}

	open = () => {
		this.selectfield.classList.add('is-selected');
		setTimeout(() => this.menu.classList.add('show'), 100);
	}

	close = () => {
		this.selectfield.classList.remove('is-selected');
		this.menu.classList.remove('show')
	}

	setValue = (e) => {
		const val = e.currentTarget.textContent;
		const {onChange} = this.props;
		this.setState({value: val})
		setTimeout(() => this.close(), 100);
		(typeof onChange == 'function') && onChange(val);
	}

	render() {
		const {menuItems, name} = this.props;
		const val = this.state.value;
		
		const lists = menuItems.map((item, index) => {
			const className = (val == item) ? 'item selected' : 'item';
			return (
				<li className={className} key={index} onClick={this.setValue}>
					<Ripple color="#bababa"/>
					{item}
				</li>
			)
		});

		return (
			<ClickAway onClickAway={this.close} hierarchy={0}>
				<div className="selectfield"  ref={r => this.selectfield = r}>
					<div onClick={this.open}>
						<input className="selectfield-input"
						   name={name} 
						   value={this.state.value} 
						   readOnly={true}
						/>
						<label className="selectfield-label">
							<svg viewBox="0 0 24 24">
								<path d="M7 10l5 5 5-5z"></path>
							</svg>
						</label>
					</div>
					
					<div className="menu-container" ref={r => this.menu = r}>
						<ul className="menu">
							{lists}
						</ul>
					</div>
				</div>
			</ClickAway>
		)
	}
}

export default SelectField;