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
		const classList = e.currentTarget.classList;
		if (index) {
			!(index == this.state.current) && this.setState({current: index});
		} else {
			if (classList.contains('jump-prev')) {
				let current = this.state.current - 5;
				current < 1 ? this.setState({current: 1}) : this.setState({current: current});
			} else if (classList.contains('jump-next')) {
				let current = this.state.current + 5;
				let total = this.state.total;
				current > total ? this.setState({current: total}) : this.setState({current: current});
			}
		}
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

	iterateItems(items, start, end, index) {
		index = index || start;
		let current = this.state.current;
		for (start; start <= end; start++) {
			const className = (current == start) ? 'item active' : 'item';
			items.push(
				<li className={className} data-index={start} onClick={this.currentChange} key={index}>
					<div className="circle"></div>
					<span>{start}</span>
				</li>
			);
			index++;
		}
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
				this.iterateItems(items, 1, total);
				break;
			case 1:
				let leftEnd = (current < 4) ? 5 : (current == 4) ? 6 : 0;
				this.iterateItems(items, 1, leftEnd);
				items.push(
					<li className="item jump-next" onClick={this.currentChange} key={leftEnd + 1}>
						<div className="circle"></div>
						<span className="mdi mdi-dots"></span>
					</li>
				);
				items.push(
					<li className="item" data-index={total} onClick={this.currentChange} key={leftEnd + 2}>
						<div className="circle"></div>
						<span>{total}</span>
					</li>
				);
				break;
			case 2:
				let diff = total - current;
				let rightEnd = diff < 3 ? 5 : diff == 3 ? 6 : 0;

				items.push(
					<li className="item" data-index={1} onClick={this.currentChange} key={1}>
						<div className="circle"></div>
						<span>1</span>
					</li>
				)
				items.push(
					<li className="item jump-prev" onClick={this.currentChange} key={2}>
						<div className="circle"></div>
						<span className="mdi mdi-dots"></span>
					</li>
				);
				this.iterateItems(items, (total - rightEnd + 1), total, 3);
				break;
			case 3:
				let start = current - 2;
				let end = current + 2;

				items.push(
					<li className="item" data-index={1} onClick={this.currentChange} key={1}>
						<div className="circle"></div>
						<span>1</span>
					</li>
				)
				items.push(
					<li className="item jump-prev" onClick={this.currentChange} key={2}>
						<div className="circle"></div>
						<span className="mdi mdi-dots"></span>
					</li>
				);

				this.iterateItems(items, start, end, 3);

				items.push(
					<li className="item jump-next" onClick={this.currentChange} key={8}>
						<div className="circle"></div>
						<span className="mdi mdi-dots"></span>
					</li>
				);
				items.push(
					<li className="item" data-index={total} onClick={this.currentChange} key={9}>
						<div className="circle"></div>
						<span>{total}</span>
					</li>
				)
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