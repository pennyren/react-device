import React from 'react';
import TextField from 'components/TextField';
import Snackbar from 'components/Snackbar';
import Button from 'components/Button';
import {history} from 'routes';
import styles from './styles.css';

class SignIn extends React.Component {
	componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }

    componentWillAppear(callback) {
        this.initAnimation(callback);
    }

    componentWillEnter(callback) {
        this.initAnimation(callback);
    }

    componentDidAppear() {
        this.animate();
    }

    componentDidEnter() {
        this.animate();
    }

    componentWillLeave(callback) {
        const style = this.signin.style;
        style.opacity = 0;
        console.log(1);
        this.leaveTimer = setTimeout(callback, 0);
    }

    animate() {
        const style = this.signin.style;
        const opacity = 'opacity 2000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
        style.opacity = 1;
        style.transition = opacity;
    }

    initAnimation(callback) {
        const style = this.signin.style;
        style.opacity = 0;
        
        this.enterTimer = setTimeout(callback, 0);
    }

    verify = () => {
        const isMatched = true;

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
						<TextField name="username" placeholder="Username" isFloat={true}/>
					</div>
					<div className="textfield">
						<i className="mdi mdi-lock-open"></i>
						<TextField name="password" placeholder="Password" isFloat={true}/>
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