import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import styles from './Cart.module.css';

function Cart(props) {
	const ctx = useContext(CartContext);

	const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
	const hasItems = ctx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		ctx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		ctx.addItem({ ...item, amount: 1 });
	};

	const cartItems = ctx.items.map((item) => (
		<CartItem
			key={item.id}
			name={item.name}
			price={item.price}
			amount={item.amount}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	));

	return (
		<Modal onHideCart={props.onHideCart}>
			<ul className={styles['cart-items']}>{cartItems}</ul>
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button
					className={styles['button-alt']}
					onClick={props.onHideCart}
				>
					Close
				</button>
				{hasItems && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	);
}

export default Cart;
