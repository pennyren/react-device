import React, {Component} from 'react';
import TextField from 'components/TextField';
import styles from './styles.css';

class Pagination extends Component {
	state = {
		total: 7,
		current: 1
	}

	prev = () => {
		let current = this.state.current;
		if (current == 1) {
			return;
		} else {
			this.setState({current: --current});
		}
	}

	next = () => {
		let current = this.state.current;
		if (current == this.state.total) {
			return;
		} else {
			this.setState({current: ++current});
		}
	}

	currentChange = (e) => {
		const index = +e.currentTarget.getAttribute('data-index');
		!(index == this.state.current) && this.setState({current: index});
	}

	goto = (e) => {
		const textfield = this.gotoField.input;
		let current = this.state.current;
		const val = +textfield.value;
		if (isNaN(val)) {
			textfield.value = '';
		} else if (val < 1 || val > this.state.total) {
			textfield.value = this.state.total;
			current = this.state.total
		} else {
			current = val;
		}

		!(current == this.state.current) && this.setState({current: current});
	}

	render() {
		let total = this.state.total;
		let current = this.state.current;
		
		const prev = current == 1 ? 'prev item disabled' : 'prev item';
		const next = current == total ? 'next item disabled' : 'next item';

		const leftJump = (current > 4) ? 1 : 0;
		const rightJump = total > (current + 3) ? 1 : 0;

		const result = total > 10 ? +parseInt('' + leftJump + rightJump, 2).toString(10) : 0;
		let items = [];

		switch (result) {
			case 0:
				for(let index = 1; index < total + 1; index++) {
					const className = (current == index) ? 'item active' : 'item';
					items.push(
						<li className={className} data-index={index} onClick={this.currentChange} key={index}>
							<div className="circle"></div>
							<span>{index}</span>
						</li>
					);
				}
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			default:
				break;
		}
		

		return (
			<section className="pagination-box">
				<ul className="pagination clearfix">
					<li className={prev} onClick={this.prev}>
						<div className="circle"></div>
						<span className="mdi mdi-left"></span>
					</li>

					{items}

					<li className={next} onClick={this.next}>
						<div className="circle"></div>
						<span className="mdi mdi-right"></span>
					</li>
					<div className="options">
						Goto
						<TextField 
							isFloat={false} 
							onEnter={this.goto} 
							ref={r => this.gotoField = r}
						/>
					</div>
				</ul>
			</section>
		)
	}
}

export default Pagination;