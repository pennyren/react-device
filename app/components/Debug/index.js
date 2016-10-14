import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Gtx from 'internals/Gtx';
import styles from './styles.css';

class Debug extends Component {
	destoryGrid() {
		this.system.style.display = "none";
	}

	drawGrid() {
		this.system.style.display = "block";

		let unitWidth = 8;
		let unitHeight = 8;
		let gtx = Gtx(this.canvas);

		gtx.fitParent();

		let width = this.canvas.clientWidth;
		let height = this.canvas.clientWidth;

		gtx.setStrokeStyle("#ddd");
		gtx.lineWidth(1);
		for(let i = 0; i * unitWidth < width; i++){
			gtx.beginPath();
			gtx.moveTo((i + 1) * unitWidth, 0);
			gtx.lineTo((i + 1) * unitWidth, height);
			gtx.stroke();
		}

		for(let i = 0; i * unitHeight < height; i++){
			gtx.beginPath();
			gtx.moveTo(0, (i + 1) * unitHeight);
			gtx.lineTo(width, (i + 1) * unitHeight);
			gtx.stroke();
		}
	}
	
	render() {
		return (
			<div className="debug-grid-system">
				<div className="debug-grid-system-canvas" style={{display: "none"}} ref={r => this.system = r}>
					<canvas ref={r => this.canvas = r} onClick={this.destoryGrid.bind(this)}></canvas>
				</div>
				<i className="toggle-grid mdi mdi-grid" onClick={this.drawGrid.bind(this)}></i>
			</div>
		);
	}
}

export default Debug;