import React from 'react';
import TextField from 'components/TextField';
import Button from 'components/Button';
import styles from './styles.css';

class SignIn extends React.Component {
	render() {
		return (
			<div className="signin">
				<div className="form">
					<div className="account">
						<i className="mdi mdi-account-circle"></i>
					</div>
					<div className="textfield">
						<i className="mdi mdi-account"></i>
						<TextField name="username" placeholder="Username" withFloat={true}/>
					</div>
					<div className="textfield">
						<i className="mdi mdi-lock-open"></i>
						<TextField name="password" placeholder="Password" withFloat={true}/>
					</div>
					<Button name="登录" isRaised={false}/>
				</div>
			</div>
		)
	}
}

export default SignIn;