export const GET_ALL_CARDS = "card@GET_ALL_CARDS";

export function getAllCards(info) {
	return {
		type: GET_ALL_CARDS,
		info
	};
}

export const actions = {
	getAllCards
};

const ACTION_HANDLERS = {
	[GET_ALL_CARDS]: (_, { info }) => {
		console.log(info);
		return info;
	}
};

export default function userReducer(state = null, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}