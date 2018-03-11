import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const SignUpView = () => (
	<div className={"sign-up"}>
		<p>Введите e-mail</p>
		<input type="text" />
		<p>Введите пароль</p>
		<input type="password" />
		<p>Повторите пароль</p>
		<input type="password" />
		<div className={"btn"}>
			Подтвердить
		</div>
	</div>
);

SignUpView.propTypes = {
};

export default connect(
	// state => ({ counter: state.counter }),
	// dispatch => ({
	// 	increment: () => dispatch(increment(1)),
	// 	doubleAsync: () => dispatch(doubleAsync())
	// })
)(SignUpView);
