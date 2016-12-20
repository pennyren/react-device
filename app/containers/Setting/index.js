import React, {Component} from 'react';
import TextField from 'components/TextField';
import Button from 'components/Button';
import getPropsFromInputs from 'utils/form';
import fetch from 'utils/fetch';
import Snackbar from 'components/Snackbar';
import styles from './styles.css';

class Setting extends Component {
	setUpPassword = (e) => {
		const setUp = getPropsFromInputs(this.setting);
		if (setUp.newPassword != setUp.confirmPassword) {
			this.snackbar.open({message: '新密码与确认密码不一致!', type: 'error'});
			return;
		}
		fetch.doPost('user/modifyPassword', setUp).then((data) => {
			const {isUpdate} = data.result;
			isUpdate ? this.snackbar.open({message: '密码更新成功!', type: 'success'})
				: this.snackbar.open({message: '旧密码错误!', type: 'error'});
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
				<Snackbar ref={r => this.snackbar = r} />
			</div>
		)
	}
}

export default Setting;