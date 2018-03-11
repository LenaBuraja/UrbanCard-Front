import React from "react";
import { connect } from "react-redux";
import validator from "validator";

export const PASS_REGEX = /^[0-9a-zA-Z]{6,}$/;

export class SignUpView extends React.Component {
	constructor() {
		super();
		this.onLostFocus = this.onLostFocus.bind(this);
		this.inputEMail = this.inputPass = this.inputRepeatPass = this.submitBtn = null;
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
				<div className={"btn inactive"} ref={(node) => (this.submitBtn = node)}>
					Подтвердить
				</div>
			</div>
		);
	}

	onLostFocus({ target }) {
		let check = (input) => (
			input.validation(input.value) &&
			(input !== this.inputRepeatPass || input.value === this.inputPass.value)
		);
		if (!check(target)) {
			target.className = "incorrect";
			this.submitBtn.className = "btn inactive";
		} else {
			target.className = "";
			let correct = true;
			[this.inputEMail, this.inputPass, this.inputRepeatPass].forEach(input => {
				if (!check(input)) {
					correct = false;
				}
			});
			if (correct) {
				this.submitBtn.className = "btn";
			}
		}
	}
}

export default connect(// state => ({ counter: state.counter }),
	// dispatch => ({
	// 	increment: () => dispatch(increment(1)),
	// 	doubleAsync: () => dispatch(doubleAsync())
	// })
)(SignUpView);
