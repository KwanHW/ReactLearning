import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

function HeaderCartButton(props) {
	const ctx = useContext(CartContext);
	const [btnIsHighlighted, setIsHighlighted] = useState(false);
	const { items } = ctx;

	const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`

	useEffect(() => {
		if (items.length === 0) {
			return;
		}

		setIsHighlighted(true);

		const bump = setTimeout(() => setIsHighlighted(false),300);

		return () => {
			clearTimeout(bump);
		}
	 },[items]);

	const numOfCartItems = items.reduce((curr, item) => {
		return curr + item.amount;
	}, 0);

	return (
		<button className={btnClasses} onClick={props.onShowCart}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{numOfCartItems}</span>
		</button>
	);
}

export default HeaderCartButton;
