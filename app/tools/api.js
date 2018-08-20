const Config = require("Config");

const apiAddress = Config.serverUrl;

/** @typedef {('GET','POST','PATCH')} Method */
const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
};

export default class Api {

	/**
	 * @private
	 * @param {Method} method
	 * @param {string} route
	 * @param {object?} data
	 */
	static fetch(method, route, data = undefined) {
		return fetch('http://' + apiAddress + route, {
			...(data ? { body: JSON.stringify(data) } : {}),
			method,
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	static post(route, data) {
		return Api.fetch(METHOD.POST, route, data).then((response) => response.json());
	}

	static patch(route, data) {
		return Api.fetch(METHOD.PATCH, route, data).then((response) => response.json());
	}

	static get(route) {
		return Api.fetch(METHOD.GET, route).then((response) => response.json());
	}
}