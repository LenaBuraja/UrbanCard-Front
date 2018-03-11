import React from "react";
import { IndexLink, Link } from "react-router";
import PropTypes from "prop-types";

export const PageLayout = ({ children }) => (
	<div className='page-layout'>
		<h1>UrbanCard</h1>
		<IndexLink to='/' activeClassName='active-nav'>Home</IndexLink>
		{"   "}
		<Link to='/counter' activeClassName='active-nav'>Counter</Link>
		<div className='viewport'>
			{children}
		</div>
	</div>
);
PageLayout.propTypes = {
	children: PropTypes.node
};

export default PageLayout;
