import React from "react";
import { Route, IndexRoute } from "react-router";
import PageLayout from "./components/PageLayout";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

export const createRoutes = (store) => (
	<div>
		<Route path='/' component={PageLayout} >
			<IndexRoute component={Home} />
			<Route path='/sign-up' component={SignUp} />
		</Route>
	</div>
);

export default createRoutes;
