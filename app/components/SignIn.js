import React from "react";
import {connect} from "react-redux";
import validator from "validator";
import {setUserInfo} from "../reducers/user";
import PropTypes from "prop-types";
import Api from "../tools/api";
import {locationChange} from "../reducers/location";

export const PASS_REGEX = /^[0-9a-zA-Z]{6,}$/;

export class SignInView extends React.Component {
	static propTypes = {
		user: PropTypes.object,
		setUserInfo: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = {
			isError: false,
			errorText: '',
		};
		this.onLostFocus = this.onLostFocus.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.inputEMail = this.inputPass = this.buttonSubmit = null;
	}

	render() {
		return (
			<div className={"sign-in"}>
				<div id="error-block" className={this.state.isError ? 'visible' : 'hidden'}>
					{this.state.errorText}
				</div>
				<p>Введите e-mail</p>
				<input type="text" ref={(node) => {
					if (this.inputEMail = node) {
						this.inputEMail.validation = validator.isEmail;
					}
				}} onChange={this.onLostFocus}/>
				<p>Введите пароль</p>
				<input type="password" ref={(node) => {
					if (this.inputPass = node) {
						this.inputPass.validation = PASS_REGEX.test.bind(PASS_REGEX);
					}
				}} onChange={this.onLostFocus}/>
				<div className={"btn inactive"} ref={(node) => (this.buttonSubmit = node)}
					 onClick={this.onSubmit}>
					Войти
				</div>
			</div>
		);
	}

	check(input) {
		return input.validation(input.value);
	}

	checkAll() {
		let inputs = [this.inputEMail, this.inputPass];
		for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
			if (!this.check(inputs[inputIndex])) {
				return false;
			}
		}
		return true;
	}

	onLostFocus({target}) {
		if (!this.check(target)) {
			target.className = "incorrect";
			this.buttonSubmit.className = "btn inactive";
		} else {
			target.className = "";
			if (this.checkAll()) {
				this.buttonSubmit.className = "btn";
			}
		}
	}

	onSubmit() {
		if (!this.checkAll()) {
			return;
		}
		Api.post("user/sign-in", {
			email: this.inputEMail.value,
			password: this.inputPass.value
		})
			.then(body => {
				if (body.status === 200) {
					console.log(body);
					this.props.setUserInfo(body.result);
				} else {
					switch (body.error) {
						case 'invalid email or password':
							this.setState({
								...this.state,
								isError: true,
								errorText: 'Неверный e-mail или пароль',
							});
							break;
						default:
							alert('Неизвестная ошибка');
					}
				}

			});
	}
}

export default connect(
	state => ({user: state.user}),
	dispatch => ({
		setUserInfo: (info) => {
			dispatch(setUserInfo(info));
			dispatch(locationChange('/'));
		}
	})
)(SignInView);
