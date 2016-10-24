import React from 'react';
import TextField from 'components/TextField';
import Snackbar from 'components/Snackbar';
import Button from 'components/Button';
import {history} from 'routes';
import fetch from 'utils/fetch';
import styles from './styles.css';

class SignIn extends React.Component {
	verify = () => {
        const isMatched = true;
        const props = {
            username: this.username.input.value,
            password: this.password.input.value
        }
        fetch.doPost('user/signin', props).then((data) => {
            console.log(data);
        });
        return;
        if (!isMatched) {
            this.snackbar.open();
        } else {
            console.log(history);
            history.push('/dashboard');
        }   
    }

	render() {
		return (
			<div className="signin" ref={r => this.signin = r}>
				<div className="form">
					<div className="account">
						<i className="mdi mdi-account-circle"></i>
					</div>
					<div className="textfield">
						<i className="mdi mdi-account"></i>
						<TextField 
                            name="username" 
                            placeholder="Username" 
                            isFloat={true} 
                            ref={r => this.username = r}
                        />
					</div>
					<div className="textfield">
						<i className="mdi mdi-lock-open"></i>
						<TextField 
                            name="password" 
                            placeholder="Password" 
                            isFloat={true} 
                            ref={r => this.password =r}
                        />
					</div>
					<Button isRaised={false} onClick={this.verify}>登陆</Button>
                </div>
                <Snackbar 
                    message="用户名或密码错误"
                    type="error"
                    ref={r => this.snackbar = r}
                 />
			</div>
		)
	}
}

export default SignIn;