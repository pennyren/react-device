import React, {Component} from 'react';
import TextField from 'components/TextField';
import Button from 'components/Button';
import getPropsFromInputs from 'utils/form';
import fetch from 'utils/fetch';
import styles from './styles.css';

class Setting extends Component {
	setUpPassword = (e) => {
		const setUp = getPropsFromInputs(this.setting);
		fetch.doPost('user/modifyPassword', setUp).then((data) => {
			console.log(data);
		})
	}

	render() {
		return (
			<div className="settings" ref={r => this.setting = r}>
				<h3 className="title">密码修改</h3>
				<TextField name="password" placeholder="旧密码" />
				<TextField name="newPassword" placeholder="新密码" />
				<TextField name="confirmPassword" placeholder="确认新密码" />
				<Button isRaised={false} onClick={this.setUpPassword}>保存</Button>
			</div>
		)
	}
}

export default Setting;