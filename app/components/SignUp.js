import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import { setUserInfo } from "../reducers/user";
import PropTypes from "prop-types";

export const PASS_REGEX = /^[0-9a-zA-Z]{6,}$/;

export class SignUpView extends React.Component {
	static propTypes = {
		user: PropTypes.object,
		setUserInfo: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.onLostFocus = this.onLostFocus.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.inputEMail = this.inputPass = this.inputRepeatPass = this.buttonSubmit = null;
	}

	render() {
		return (
			<div className={"sign-up"}>
				<p>Введите e-mail</p>
				<input type="text" ref={(node) => {
					if (this.inputEMail = node) {
						this.inputEMail.validation = validator.isEmail;
					}
				}} onChange={this.onLostFocus} />
				<p>Введите пароль</p>
				<input type="password" ref={(node) => {
					if (this.inputPass = node) {
						this.inputPass.validation = PASS_REGEX.test.bind(PASS_REGEX);
					}
				}} onChange={this.onLostFocus} />
				<p>Повторите пароль</p>
				<input type="password" ref={(node) => {
					if (this.inputRepeatPass = node) {
						this.inputRepeatPass.validation = PASS_REGEX.test.bind(PASS_REGEX);
					}
				}} onChange={this.onLostFocus} />
				<div className={"btn inactive"} ref={(node) => (this.buttonSubmit = node)}
					 onClick={this.onSubmit}>
					Подтвердить
				</div>
			</div>
		);
	}

	check(input) {
		return input.validation(input.value) &&
			(input !== this.inputRepeatPass || input.value === this.inputPass.value);
	}

	checkAll() {
		let inputs = [this.inputEMail, this.inputPass, this.inputRepeatPass];
		for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
			if (!this.check(inputs[inputIndex])) {
				return false;
			}
		}
		return true;
	}

	onLostFocus({ target }) {
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
		fetch("http://localhost:5000/api/say-hello", {
			method: "GET"
			// data: {
			// 	email: this.inputEMail,
			// 	password: this.inputPass
			// }
		})
			.then(response => response.json())
			.then(body => {
				console.log(body);
				this.props.setUserInfo(body);
			});
	}
}

export default connect(
	state => ({ user: state.user }),
	dispatch => ({
		setUserInfo: (info) => dispatch(setUserInfo(info))
	})
)(SignUpView);
