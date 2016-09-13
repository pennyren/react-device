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
		
		const message = 'hello react';
		return (
			<div className="verification">
				<Button name="登录" isRaised={false} onClick={this.singinVerify}/>
				<Snackbar 
					clearBindEvents={false}
					removeLayer={true} 
					open={this.state.open} 
					message={message}/>
			</div>
			

		)
	}
}

export default Verification;