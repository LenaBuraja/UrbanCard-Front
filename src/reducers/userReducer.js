import { createModule } from 'redux-modules';

export default createModule({
	name: 'user',
	initialState: {
		info: null,
		cards: null,
		ordersByCardId: {},
		authChecked: false,
		priceList: [],
	},
	transformations: {
		setUserInfo: { reducer: (state, { payload }) => ({ ...state, info: payload, authChecked: true }) },
		setCardsInfo: { reducer: (state, { payload }) => ({ ...state, cards: payload }) },
		authChecked: { reducer: (state) => ({ ...state, authChecked: true }) },
		setOrderInfo: {
			reducer: (state, { payload }) => {
				const { cardId, orders } = payload;
				const newState = { ...state };
				newState.ordersByCardId = { ...newState.ordersByCardId, [cardId]: orders };
				return newState;
			},
		},
		setPriceList: { reducer: (state, { payload }) => ({ ...state, priceList: payload }) },
	},
});
