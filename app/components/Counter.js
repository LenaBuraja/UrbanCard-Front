import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { increment, doubleAsync } from "../reducers/counter";

export const CounterView = ({ counter, increment, doubleAsync }) => (
	<div style={{ margin: "0 auto" }}>
		<h2>Counter: {counter}</h2>
		<button className='btn btn-primary' onClick={increment}>
			Increment
		</button>
		{" "}
		<button className='btn btn-secondary' onClick={doubleAsync}>
			Double (Async)
		</button>
	</div>
);

CounterView.propTypes = {
	counter: PropTypes.number.isRequired,
	increment: PropTypes.func.isRequired,
	doubleAsync: PropTypes.func.isRequired
};

export default connect(
	state => ({ counter: state.counter }),
	dispatch => ({
		increment: () => dispatch(increment(1)),
		doubleAsync: () => dispatch(doubleAsync())
	})
)(CounterView);
