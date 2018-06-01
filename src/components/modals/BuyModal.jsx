import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../actions/UserActions';

class BuyModal extends React.Component {

	componentWillMount() {
		this.transportChecks = {};
		this.props.getPriceList();
		this.setState({ selector: null, transportType: null, price: null });
	}

	changeSelector(to) {
		if (this.state.selector === to) return;
		this.setState({ ...this.state, selector: to, transportType: null, price: null });
		Object.keys(this.transportChecks).forEach((a) => {
			this.transportChecks[a].checked = false;
		});
	}

	render() {
		const byDays = this.state.selector === 'byDays';
		const byTrips = this.state.selector === 'byTrips';
		const content = this.state.selector ? [] : null;
		if (content) {
			const inputType = byDays ? 'checkbox' : 'radio';
			content.push((
				<div key="checks">
					<p style={{ width: '128px' }}>{this.state.selector === 'byDays' ? 'Типы' : 'Тип'} транспорта</p>
					{[
						{ type: 'bus', title: 'Автобус' },
						{ type: 'metro', title: 'Метро' },
						{ type: 'tram', title: 'Трамвай' },
						{ type: 'trolleybus', title: 'Троллейбус' },
					].map(({ type, title }) => (
						<span>
							<input
								style={{ width: '64px' }}
								id={type}
								name="transport"
								type={inputType}
								ref={(node) => {
									this.transportChecks[type] = node;
								}}
								onChange={() => {
									const activeChecksCount = Object.keys(this.transportChecks)
										.filter(a => this.transportChecks[a].checked).length;
									const transportType =
										(activeChecksCount - 1) * 2 + (this.transportChecks.metro.checked ? 1 : 0);
									if (transportType >= 0) {
										const selectedCount = this.props.priceList
											.filter(a =>
												a.transportType === transportType
												&& a.orderType === this.state.selector)
											.map(({ count }) => count)
											.sort()
											[0];
										this.setState({
											...this.state,
											transportType,
											count: selectedCount,
											price: this.props.priceList.find(a =>
												a.transportType === transportType
												&& a.count === selectedCount).value,
										});
									} else {
										this.setState({ ...this.state, transportType: null, price: null });
									}
								}}
							/>
							<label htmlFor={type}>{title}</label>
						</span>
					))}
				</div>
			));
			content.push((
				<div key="kolvo" style={{ opacity: this.state.transportType === null ? 0 : 1 }}>
					<label>Кол-во</label>
					<select
						defaultValue={this.state.count}
						onChange={(e) => {
							const count = Number.parseInt(e.target.options[e.target.selectedIndex].value, 10);
							console.log(count);
							console.log(this.state.transportType);
							console.log(this.props.priceList);
							const priceRow = this.props.priceList.find(a =>
								a.transportType === this.state.transportType
								&& a.count === count);
							if (priceRow) {
								this.setState({ ...this.state, price: priceRow.value, count });
							} else {
								this.setState({ ...this.state, price: null, count: null });
							}
						}}
					>
						{this.state.transportType === null ? [] :
							this.props.priceList
								.filter(a =>
									a.transportType === this.state.transportType
									&& a.orderType === this.state.selector)
								.map(({ count }) => count)
								.sort()
								.map((count) => (
									<option key={count}>
										{count}
									</option>
								))}
					</select>
				</div>
			));
			content.push((
				<div key="price" style={{ opacity: this.state.price ? 1 : 0 }}>
					<div>
						<p>Стоимость: {this.state.price} руб.</p>
						<button
							onClick={(e) => {
								e.preventDefault();
								const transports = ['bus', 'metro', 'tram', 'trolleybus']
									.filter(t => this.transportChecks[t].checked);
								this.props.createOrder(
									this.props.cardId,
									transports.join(','),
									this.state.selector,
									this.state.count,
								).then(() => {
									this.props.OnClose();
								});
							}}
						>
							Оплатить
						</button>
					</div>
				</div>
			));
		}
		return (
			<div className="modal">
				<div className="modal-header">
					<button
						onClick={(e) => {
							e.preventDefault();
							this.props.OnClose();
						}}
					>
						X
					</button>
				</div>
				<div className="modal-body">
					<div className="selector">
						<p
							onClick={() => this.changeSelector('byDays')}
							className={byDays ? 'active' : ''}
						>
							По дням
						</p>
						<p
							onClick={() => this.changeSelector('byTrips')}
							className={byTrips ? 'active' : ''}
						>
							По Поездкам
						</p>
					</div>
					<div className="content-of-selector">
						{this.props.priceList ? content : 'Загрузка...'}
					</div>
				</div>
			</div>
		);
	}
}

BuyModal.propTypes = {
	OnClose: PropTypes.func.isRequired,
	cardId: PropTypes.string.isRequired,
};

export default connect(
	(state) => ({ priceList: state.user.priceList }),
	(dispatch) => ({
		getPriceList: () => dispatch(UserActions.getPriceList()),
		createOrder: (cardId, transports, orderType, count) =>
			dispatch(UserActions.createOrder(cardId, transports, orderType, count)),
	}),
)(BuyModal);
