import React from 'react';
import UserActions from '../../../actions/UserActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const STEP = {
	SIGN_IN: 'sign-in',
	SIGN_UP: 'sign-up',
};

class AuthPage extends React.Component {

	componentWillMount() {
		this.state = {
			step: STEP.SIGN_IN,
		};
	}

	render() {
		if (this.props.userInfo) return <Redirect to="/" />;
		return (
			<div id="auth">
				<div className='header'>
					<button
						className={this.state.step === STEP.SIGN_IN ? 'active' : ''}
						onClick={() => {
							this.setState({ ...this.state, step: STEP.SIGN_IN });
						}}
					>
						Вход
					</button>
					<button
						className={this.state.step === STEP.SIGN_UP ? 'active' : ''}
						onClick={() => {
							this.setState({ ...this.state, step: STEP.SIGN_UP });
						}}
					>
						Регистрация
					</button>
				</div>
				<form
					className={`form sign-${this.state.step === STEP.SIGN_IN ? 'in' : 'up'}`}
					onSubmit={(e) => {
						e.preventDefault();
						if (this.state.step === STEP.SIGN_IN) {
							this.props.signIn(this.emailInput.value, this.passwordInput.value);
						} else {
							this.props.signUp(this.emailInput.value, this.passwordInput.value);
						}
					}}
				>
					<p>Email</p>
					<input
						ref={(node) => {
							this.emailInput = node;
						}}
					/>
					<p>Пароль</p>
					<input
						ref={(node) => {
							this.passwordInput = node;
						}}
					/>
					<p className={this.state.step === STEP.SIGN_IN ? 'hidden' : ''}>Повторите пароль</p>
					<input className={this.state.step === STEP.SIGN_IN ? 'hidden' : ''} />
					<input type="submit" value="Вход" />
				</form>
			</div>
		);
	}

}

export default connect(
	(state) => ({
		userInfo: state.user.info,
	}),
	(dispatch) => ({
		signUp: (email, password) => dispatch(UserActions.signUp(email, password)),
		signIn: (email, password) => dispatch(UserActions.signIn(email, password)),
	}),
)(AuthPage);
