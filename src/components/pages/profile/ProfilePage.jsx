import React from 'react';
import dateformat from 'dateformat';
import UserLogoDefault from '../../../assets/images/userLogoDefault.png';
import { connect } from 'react-redux';
import UserActions from '../../../actions/UserActions';
import Card from '../../elements/Card';
import sha256 from 'sha256';

class ProfilePage extends React.Component {

	componentWillMount() {
		this.props.getAllCards();
		this.setState({
			activeCard: null,
		})
	}

	render() {
		if (!this.props.authChecked) return null;
		const { userInfo } = this.props;
		return (
			<div id="profile-page">
				<div className="header">
					<img src={UserLogoDefault} alt="" />
					<div>
						<p>{userInfo.email}</p>
						<p>Зарегистрирован: <b>{dateformat(userInfo.createdAt, 'd.mm.yyyy h:MM:ss')}</b></p>
					</div>
				</div>
				<div className="cards">
					<div>
						{!this.props.cardsInfo ? 'Загрузка' : [
							<div key="title" className="legend">
								<p><h3>Карты</h3></p>
								<p>ID</p>
								<p>Дата активации</p>
								<p>Активных пополнений</p>
								<p>Всего пополнений</p>
							</div>,
							this.props.cardsInfo.map((card) => {
								const cardId = sha256(card.id);
								const isActive = this.state.activeCard && this.state.activeCard.id === card.id;
								const row = (
									<div
										className={`card-row ${isActive ? 'active' : ''}`}
										onClick={(e) => {
											e.preventDefault();
											this.props.getOrders(card.id);
											this.setState({ ...this.state, activeCard: isActive ? null : card });
										}}
									>
										<p>
											<Card id={Number.parseInt(cardId.slice(0, 8), 16)} />
										</p>
										<p>
											{`${cardId.slice(0, 4)} ... ${cardId.slice(60, 64)}`}
										</p>
										<p>
											{dateformat(cardId.createdAt, 'd.mm.yyyy')}
										</p>
										<p>
											{card.activeOrdersIds.length}
										</p>
										<p />
									</div>
								);
								if (!isActive) return row;
								return [
									row,
									<div className="details">
										<p><span>ID</span>: {sha256(this.state.activeCard.id)}</p>
										<p><span>MDB ObjectId</span>: {this.state.activeCard.id}</p>
										{this.props.orders[card.id] ? (
											<p>{JSON.stringify(this.props.orders[card.id])}</p>
										) : 'Загрузка...'}
									</div>
								]
							}),
						]}
					</div>
				</div>
			</div>
		);
	}

}

export default connect(
	(state) => ({
		authChecked: state.user.authChecked,
		userInfo: state.user.info,
		cardsInfo: state.user.cards,
		orders: state.user.ordersByCardId,
	}),
	(dispatch) => ({
		getAllCards: () => dispatch(UserActions.getAllCards()),
		getOrders: (id) => dispatch(UserActions.getOrders(id)),
	}),
)(ProfilePage);
