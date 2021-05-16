import { useState, useRef } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

function MealItemForm(props) {
	const [amtValid, setAmtValid] = useState(true);
	const amtInRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredAmt = +amtInRef.current.value;

		if (
			amtInRef.current.value.trim().length === 0 ||
			enteredAmt < 1 ||
			enteredAmt > 5
		) {
			setAmtValid(false);
			return;
		}

		props.onAddToCart(enteredAmt);
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				label="Amount"
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
				ref={amtInRef}
			/>
			<button>+ Add</button>
			{!amtValid && <p>Please enter a valid amount (1-5)</p>}
		</form>
	);
}

export default MealItemForm;
