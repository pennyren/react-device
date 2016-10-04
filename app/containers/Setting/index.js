import React, {Component} from 'react';
import TextField from 'components/TextField';
import Button from 'components/Button';
import styles from './styles.css';

class Setting extends Component {
	render() {
		return (
			<div className="settings">
				<h3 className="title">密码修改</h3>
				<TextField name="password" placeholder="旧密码" />
				<TextField name="password" placeholder="新密码" />
				<TextField name="password" placeholder="确认新密码" />
				<Button name="保存" isRaised={false}/>
			</div>
		)
	}
}

export default Setting;