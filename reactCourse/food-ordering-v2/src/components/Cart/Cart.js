import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import Checkout from './Checkout';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	const onOrderHandler = () => {
		setIsCheckout(true);
	};

	const onCancelHandler = () => {
		setIsCheckout(false);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);

		// Assume that it always works
		const response = await fetch(
			'https://react-http-8866e-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);

		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = isCheckout ? (
		<Checkout onCancel={onCancelHandler} onConfirm={submitOrderHandler} />
	) : (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={onOrderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModal = isSubmitting ? (
		<p>Sending order data...</p>
	) : (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{modalActions}
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!didSubmit && cartModal}
			{didSubmit && (
				<React.Fragment>
					<p>Successfully sent the order!</p>
					<div className={classes.actions}>
						<button
							className={classes.button}
							onClick={props.onClose}
						>
							Close
						</button>
					</div>
				</React.Fragment>
			)}
		</Modal>
	);
};

export default Cart;
