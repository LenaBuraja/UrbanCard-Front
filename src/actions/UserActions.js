import axios from 'axios';
import UserReducer from './../reducers/userReducer';

const Config = require('Config');

axios.defaults.withCredentials = true;

export default class UserActions {

	static getFullRoute(route) {
		return `http://${Config.serverAddress}/api/v1/${route}`;
	}

	static signUp(email, password) {
		return (dispatch) => new Promise((resolve, reject) => {
			UserActions.POST('user/sign-up', { email, password })
				.then((res) => {
					dispatch(UserReducer.actions.setUserInfo(res.data.result));
					resolve();
				})
				.catch((e) => reject(e.response.data));
		});
	}

	static signIn(email, password) {
		return (dispatch) => new Promise((resolve, reject) => {
			UserActions.POST('user/sign-in', { email, password })
				.then((res) => {
					dispatch(UserReducer.actions.setUserInfo(res.data.result));
					resolve();
				})
				.catch((e) => {
					reject(e.response.data);
				});
		});
	}

	static logout() {
		return (dispatch) => new Promise((resolve, reject) => {
			UserActions.GET('user/sign-out')
				.then(() => {
					dispatch(UserReducer.actions.setUserInfo(null));
					resolve();
				})
				.catch((e) => {
					reject(e.response.data);
				});
		});
	}

	static getAllCards() {
		return (dispatch) => new Promise((resolve, reject) => {
			UserActions.GET('card/get-all')
				.then((res) => {
					dispatch(UserReducer.actions.setCardsInfo(res.data.result));
					resolve();
				});
		});
	}

	static getOrders(cardId) {
		return (dispatch) => new Promise((resolve, reject) => {
			UserActions.GET(`card/all-orders?cardId=${cardId}`)
				.then((res) => {
					console.log(res.data.result);
					dispatch(UserReducer.actions.setOrderInfo({
						cardId,
						orders: res.data.result,
					}));
					resolve();
				});
		});
	}

	static me() {
		return (dispatch) => new Promise((resolve, reject) => {
			UserActions.GET('user/me')
				.then((res) => {
					dispatch(UserReducer.actions.setUserInfo(res.data.result));
					console.log('logged as ' + res.data.result.email);
					resolve();
				})
				.catch((e) => {
					if (e.response.data.error === 'unauthorized') {
						console.log('unauthorized');
						dispatch(UserReducer.actions.authChecked());
					} else {
						alert(`Unknown error: ${JSON.stringify(e.response.data.error)} with status ${e.response.data.status}`);
					}
					// reject()
				});
		});
	}

	static req(route, method, data = {}) {
		return axios[method](UserActions.getFullRoute(route), data);
	}

	static GET(route) {
		return UserActions.req(route, 'get');
	}

	static POST(route, data) {
		return UserActions.req(route, 'post', data);
	}

}
