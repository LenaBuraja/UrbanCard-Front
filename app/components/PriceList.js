import React from "react";
import {connect} from "react-redux";
import validator from "validator";
import {getPriceList} from "../reducers/price";
import PropTypes from "prop-types";
import Api from "../tools/api";
import {locationChange} from "../reducers/location";

export class PriceListView extends React.Component {
	static propTypes = {
		price: PropTypes.object,
		getPriceList: PropTypes.func.isRequired
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
			<div >

			</div>
		);
	}

}

export default connect(
	state => ({price: state.price}),
	dispatch => ({
		getPriceList: (info) => {
			dispatch(getPriceList(info));
			dispatch(locationChange('/'));
		}
	})
)(PriceListView);