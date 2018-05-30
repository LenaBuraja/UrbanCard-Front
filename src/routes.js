import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Home from './components/pages/home/HomePage';
import About from './components/pages/about/AboutPage';
import Auth from './components/pages/auth/AuthPage';
import Profile from './components/pages/profile/ProfilePage';

export default class Routes extends React.Component {

	render() {
		return (
			<App>
				<div id="content">
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/auth" component={Auth} />
					<Route exact path="/profile" component={Profile} />
				</div>
			</App>
		);
	}

}
