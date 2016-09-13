import React, {Component} from 'react';
import Snackbar from 'components/Snackbar';
import Button from 'components/Button';

class Verification extends Component {
	state = {
		open: false
	}

	singinVerify = () => {
		
		this.setState({open: !this.state.open});
	}

	render() {
		
		const message = '用户名或密码不正确';
		return (
			<div className="verification">
				<Button name="登录" isRaised={false} onClick={this.singinVerify}/>
				<Snackbar open={this.state.open} message={message}/>
			</div>
			

		)
	}
}

export default Verification;