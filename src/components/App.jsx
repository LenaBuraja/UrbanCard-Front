import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../actions/UserActions';
import Header from './layout/Header';
import Footer from './layout/Footer';

class App extends React.Component {

	componentWillMount() {
		if (!this.props.authChecked) {
			this.props.me();
		}
	}

	render() {
		return (
			<div className="wrapper">
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}

}

App.propTypes = {
	children: PropTypes.element.isRequired,
};

export default connect(
	(state) => ({
		authChecked: state.user.authChecked,
	}),
	(dispatch) => ({
		me: () => dispatch(UserActions.me()),
	}),
)(App);
