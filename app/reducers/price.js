export const GET_PRICE_LIST = "price@GET_PRICE_LIST";

export function getPriceList(info) {
	return {
		type: GET_PRICE_LIST,
		info
	};
}

export const actions = {
	getPriceList
};

const ACTION_HANDLERS = {
	[GET_PRICE_LIST]: (_, { info }) => {
		console.log(info);
		return info;
	}
};

export default function userReducer(state = null, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}