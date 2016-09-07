import React from 'react';
import TextField from 'components/TextField';
import styles from './styles.css';

class SignIn extends React.Component {
	render() {
		return (
			<div className="signin">
				<div className="form">
					<TextField name="username" placeholder="Username" withFloat={true}/>
					<TextField name="password" placeholder="Password" withFloat={true}/>
				</div>
			</div>
		)
	}
}

export default SignIn;