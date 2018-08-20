import React from "react";
import {connect} from "react-redux";
import validator from "validator";
import {getAllCards} from "../reducers/card";
import PropTypes from "prop-types";
import Api from "../tools/api";
import {locationChange} from "../reducers/location";

export class PersonalAreaView extends React.Component {
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
	}

	render() {
		return (
			<div>
				<div className="userName">
					<p>{this.props.user}</p>
				</div>
				<div className={"btn active"} ref={(node) => (this.buttonSubmit = node)}
					 onClick={this.onSubmit}>
					Добавить карточку
				</div>
				<div className="card">

				</div>
			</div>
		);
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
	state => ({
		user: state.user,
		card: state.card,
	}),
	dispatch => ({
		getAllCards: (info) => {
			dispatch(getAllCards(info));
			dispatch(locationChange('/'));
		}
	})
)(PersonalAreaView);
