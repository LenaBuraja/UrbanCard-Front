import React from 'react';
import dateformat from 'dateformat';
import UserLogoDefault from '../../../assets/images/userLogoDefault.png';
import BusLogo from '../../../assets/images/transports/bus.png';
import MetroLogo from '../../../assets/images/transports/metro.png';
import TramLogo from '../../../assets/images/transports/tram.png';
import TrolleybusLogo from '../../../assets/images/transports/trolleybus.png';
import { connect } from 'react-redux';
import UserActions from '../../../actions/UserActions';
import Card from '../../elements/Card';
import BuyModal from '../../modals/BuyModal';
import sha256 from 'sha256';

const DAY = 24 * 60 * 60000;

const localization = {
	bus: 'Автобус',
	metro: 'Метро',
	tram: 'Трамвай',
	trolleybus: 'Троллейбус',
};

const transportTypeToTransports = (transportType) => {
	let t = transportType;
	const result = [];
	['bus', 'metro', 'tram', 'trolleybus'].reverse().forEach((tr) => {
		if (t % 2 === 1) {
			result.push(tr);
		}
		t = Math.floor(t / 2);
	});
	return result.reverse();
};

const transportToImage = (transport) => {
	switch (transport) {
		case 'bus':
			return BusLogo;
		case 'metro':
			return MetroLogo;
		case 'tram':
			return TramLogo;
		case 'trolleybus':
			return TrolleybusLogo;
		default:
			return null;
	}
};

class ProfilePage extends React.Component {

	componentWillMount() {
		this.props.getAllCards();
		this.setState({
			activeCard: null,
			modal: null,
		});
	}

	render() {
		if (!this.props.authChecked) return null;
		const { userInfo } = this.props;
		return (
			<div id="profile-page">
				{this.state.modal ? [
					<div className="dk-back" />,
					<div className="modal-container">
						{this.state.modal}
					</div>,
				] : null}
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
								<p />
							</div>,
							this.props.cardsInfo.map((card) => {
								const cardId = sha256(card.id);
								const isActive = this.state.activeCard && this.state.activeCard.id === card.id;
								const currentTime = new Date().getTime();
								const orders = this.props.orders[card.id] ? this.props.orders[card.id].map((order) => {
									order.endsIn = new Date(order.activateAt).getTime() + DAY *
										(order.orderType === 'byTrips' ? 60 : order.count);
									if (order.endsIn < currentTime) {
										order.isNotPassed = false;
									}
									return order;
								}).sort((a, b) => {
									if (a.isNotPassed === b.isNotPassed) {
										return Math.sign(b.endsIn - a.endsIn);
									}
									if (a.isNotPassed) return -1;
									return 1;
								}) : null;
								const row = (
									<div className={`card-row ${isActive ? 'active' : ''}`}>
										<span
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
												{orders ? orders.filter(r => r.isNotPassed).length
													: card.activeOrdersIds.length}
											</p>
										</span>
										<p>
											<button onClick={(e) => {
												e.preventDefault();
												console.log(1);
												this.setState({
													...this.state,
													activeCard: card,
													modal: (
														<BuyModal
															OnClose={() => {
																this.setState({ ...this.state, modal: null });
															}}
															cardId={card.id}
														/>
													),
												});
											}}>
												Пополнить
											</button>
										</p>
									</div>
								);
								if (!isActive) return row;
								return [
									row,
									<div className="details">
										<p><span>ID</span>: {sha256(this.state.activeCard.id)}</p>
										<p><span>MDB ObjectId</span>: {this.state.activeCard.id}</p>
										{orders ? orders.map((order) => (
											<div key={order.id} className={order.isNotPassed ? 'active' : ''}>
												{order.orderType === 'byTrips' ? (
													<p>{order.count} поездок</p>
												) : (
													<p>{order.count} дней</p>
												)}
												<span>
													{transportTypeToTransports(order.transportType).map((tr) => (
														<span className="tooltip">
															<img
																key={`${tr}img`}
																src={transportToImage(tr)}
																alt=""
															/>
															<span
																key={`${tr}tooltip`}
																className="tooltiptext"
															>
																{localization[tr]}
															</span>
														</span>
													))}
												</span>
												<p>
													с {dateformat(new Date(order.activateAt), 'd.mm.yyyy') + ' '}
													по {dateformat(new Date(order.endsIn), 'd.mm.yyyy') + ' '}
													({dateformat(new Date(order.endsIn), 'HH:MM')})
												</p>
											</div>
										)) : 'Загрузка...'}
									</div>,
								];
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
