import React, {Component} from 'react';
import TextField from 'components/TextField';
import styles from './styles.css';

class Pagination extends Component {
	prev = () => {
		let {onChange, current} = this.props;
		current !== 1 &&  onChange(--current)
	}

	next = () => {
		let {onChange, current, total} = this.props;
		current !== total && onChange(++current)
	}

	currentChange = (e) => {
		const {onChange, current, total} = this.props;
		const index = +e.currentTarget.getAttribute('data-index');
		const classList = e.currentTarget.classList;
		let finalCurrent = current;
		let isChanged = false;

		if (current !== index) {
			finalCurrent = index;
			isChanged = true;
		} else {
			if (classList.contains('jump-prev')) {
				const jumpCurrent = current - 5;
				finalCurrent = jumpCurrent < 1 ? 1 : jumpCurrent;
				isChanged = true;
			} else if (classList.contains('jump-next')) {
				const jumpCurrent = current + 5;
				finalCurrent = jumpCurrent > total ? total : jumpCurrent;
				isChanged = true;
			}
		}

		isChanged && onChange(finalCurrent);
	}

	goto = (e) => {
		const {onChange, total, current} = this.props;
		const textfield = this.gotoField.input;
		const val = +textfield.value;
		let finalCurrent = current;

		if (isNaN(val)) {
			textfield.value = '';
		} else if (val < 1 || val > total) {
			textfield.value = total;
			finalCurrent = total
		} else {
			finalCurrent = val;
		}
		(finalCurrent !== current) && onChange(current);
	}

	iterateItems(items, start, end, index) {
		index = index || start;
		let current = this.props.current;
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
		const {total, current} = this.props;
		if (!total || total < 2) {
			return null; 
		}

		const prev = current == 1 ? 'prev item disabled' : 'prev item';
		const next = current == total ? 'next item disabled' : 'next item';

		const leftJump = (current > 4) ? 1 : 0;
		const rightJump = total > (current + 3) ? 1 : 0;

		const result = total > 10 ? +parseInt('' + leftJump + rightJump, 2).toString(10) : 0;
		let items = [];

		const goto = (
			<div className="options">
				Goto
				<TextField 
					isFloat={false} 
					onEnter={this.goto} 
					ref={r => this.gotoField = r}
				/>
			</div>
		);

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
					{total > 20 && goto}
				</ul>
			</section>
		)
	}
}

export default Pagination;