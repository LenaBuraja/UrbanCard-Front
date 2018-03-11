import React from "react";
import ReactDOM from "react-dom";
import createStore from "./createStore";
import "./assets/stylesheets/main.scss";
import App from "./App";
import CreateRoutes from "./createRoutes";

const store = createStore(window.__INITIAL_STATE__);
const MOUNT_NODE = document.getElementById("root");

let render = () => {
	const routes = CreateRoutes(store);
	ReactDOM.render(
		<App store={store} routes={routes} />,
		MOUNT_NODE
	);
};

if (__DEV__) {
	if (module.hot) {
		const renderApp = render;
		const renderError = (error) => {
			const RedBox = require("redbox-react").default;
			ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
		};
		render = () => {
			try {
				renderApp();
			} catch (e) {
				console.error(e);
				renderError(e);
			}
		};
		module.hot.accept([
			"./App",
			"./createRoutes"
		], () => setImmediate(() => {
			ReactDOM.unmountComponentAtNode(MOUNT_NODE);
			render();
		}));
	}
}

if (!__TEST__) {
	render();
}
