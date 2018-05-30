import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Logo from '../../assets/images/logo.png';
import { connect } from 'react-redux';
import UserActions from '../../actions/UserActions';

class Header extends React.PureComponent {

	render() {
		const { userInfo } = this.props;
		return (
			<header>
				<NavLink className="main" to="/" exact activeClassName="active">
					<img src={Logo} alt="" />
					<p>UrbanCard</p>
				</NavLink>
				<div className="links">
					<NavLink to="/about" activeClassName="active">Информация</NavLink>
					{!this.props.authChecked ? <p /> : [
						<NavLink to="/profile" activeClassName="active">Личный кабинет</NavLink>,
						userInfo ? (
							<div>
								<p className="userEmail">{userInfo.email}</p>
								<p
									className="logout"
									onClick={(e) => {
										e.preventDefault();
										this.props.logout();
									}}
								>
									Выйти
								</p>
							</div>
						) : <NavLink to="/auth" activeClassName="active">Вход</NavLink>,
					]}
				</div>
			</header>
		);
	}

}

export default compose(
	withRouter,
	connect(
		(state) => ({
			authChecked: state.user.authChecked,
			userInfo: state.user.info,
		}),
		(dispatch) => ({
			updateUserInfo: () => dispatch(UserActions.updateUserInfo()),
			logout: () => dispatch(UserActions.logout()),
		}),
	),
)(Header);
