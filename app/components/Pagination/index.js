import React, {Component} from 'react';
import TextField from 'components/TextField';
import styles from './styles.css';

class Pagination extends Component {
	state = {
		total: 10,
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
		const total = this.state.total;
		const current = this.state.current;
		const useJump =  total > 10 ? true : false; 
		const prev = current == 1 ? 'prev item disabled' : 'prev item';
		const next = current == total ? 'next item disabled' : 'next item';

		let items = [];

		if (!useJump) {
			for (let i = 1; i < total + 1; i++) {
				const className = current == i ? 'item active' : 'item';
				items.push(
					<li className={className} data-index={i} onClick={this.currentChange} key={i}>
						<div className="circle"></div>
						<span>{i}</span>
					</li>
				);
			}
		} else {
			const leftJump = (current > 4) ? true : false;
			const rightJump = total > (current + 3) ? true : false;
			
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