import React from "react";
import { Route, IndexRoute } from "react-router";
import PageLayout from "./components/PageLayout";
import Home from "./components/Home";
import Counter from "./components/Counter";

export const createRoutes = (store) => (
	<div>
		<Route path='/' component={PageLayout} >
			<IndexRoute component={Home} />
			<Route path='/counter' component={Counter} />
		</Route>
	</div>
);

export default createRoutes;
