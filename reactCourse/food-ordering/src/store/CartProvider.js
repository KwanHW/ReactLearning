import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type == 'ADD_ITEM') {
		// Checks if the item already exists in the array
		const existingIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const newTotal =
			state.totalAmount + action.item.price * action.item.amount;

		let updatedItems;
		if (existingIndex != -1) {
			const existingItem = state.items[existingIndex];
			let updItem = {
				...existingItem,
				amount: existingItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingIndex] = updItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return { items: updatedItems, totalAmount: newTotal };
	}

	if (action.type === 'REMOVE_ITEM') {
		const existingIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const existingItem = state.items[existingIndex];
		const newAmount = state.totalAmount - existingItem.price;

		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingIndex] = updItem;
		}

		return { items: updatedItems, totalAmount: newAmount };
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD_ITEM', item });
	};

	const removeFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE_ITEM', id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addToCartHandler,
		removeItem: removeFromCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
