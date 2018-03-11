export const SET_USER_INFO = "user@SET_USER_INFO";

export function setUserInfo(info) {
	return {
		type: SET_USER_INFO,
		info
	};
}

export const actions = {
	setUserInfo
};

const ACTION_HANDLERS = {
	[SET_USER_INFO]: (_, { info }) => {
		console.log(info);
		return info;
	}
};

export default function userReducer(state = null, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}
