import React, {Component} from 'react';
import Snackbar from 'components/Snackbar';
import Button from 'components/Button';
import {history} from 'routes';

class Verification extends Component {
	state = {
		open: false,
		message: '用户名或密码不正确'
	}

	singinVerify = () => {
		const isMatched = true;

		if (!isMatched) {
			this.setState({open: true});
			const snackbarTimer = setTimeout(() => {
				this.setState({open: false});
			}, 1000);
		} else {
			console.log(history);
			history.push('/dashboard');
		}	
	}

	render() {
		return (
			<div className="verification">
				<Button name="登录" isRaised={false} onClick={this.singinVerify}/>
				<Snackbar open={this.state.open} message={this.state.message} />
			</div>
		)
	}
}

export default Verification;