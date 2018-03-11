import React from "react";
import { IndexLink, Link } from "react-router";
import PropTypes from "prop-types";

export const PageLayout = ({ children }) => (
	<div className="page-layout">
		<div className="header">
			<IndexLink to="/" activeClassName="active-nav">
				<h1>UrbanCard</h1>
			</IndexLink>
			<div>
				<Link to="/price-list" className={"btn"} activeClassName="active-nav">
					Тарифы
				</Link>
				<Link to="/sign-up" className={"btn"} activeClassName="active-nav">
					Регистрация
				</Link>
				<Link to="/counter" className={"btn"} activeClassName="active-nav">
					Вход
				</Link>
			</div>
		</div>
		<div className="viewport">
			{children}
		</div>
	</div>
);
PageLayout.propTypes = {
	children: PropTypes.node
};

export default PageLayout;
