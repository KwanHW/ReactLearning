import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isNotEmpty = (value) => value.trim() !== '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputValid, setInputValid] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	const nameRef = useRef();
	const streetRef = useRef();
	const postalRef = useRef();
	const cityRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const nameIn = nameRef.current.value;
		const streetIn = streetRef.current.value;
		const postalIn = postalRef.current.value;
		const cityIn = cityRef.current.value;

		setInputValid({
			name: isNotEmpty(nameIn),
			street: isNotEmpty(streetIn),
			postalCode: isFiveChars(postalIn),
			city: isNotEmpty(cityIn),
		});
		// const nameValid = isNotEmpty(nameIn);
		// const streetValid = isNotEmpty(streetIn);
		// const postalValid = isFiveChars(postalIn);
		// const cityValid = isNotEmpty(cityIn);

		const formIsValid =
			formInputValid.name &&
			formInputValid.street &&
			formInputValid.postalCode &&
			formInputValid.city;

		if (!formIsValid) {
			return;
		}

    props.onConfirm({
      name: nameIn,
      street: streetIn,
      postalCode: postalIn,
      city: cityIn,
    })
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div
				className={`${classes.control} ${
					formInputValid.name ? '' : classes.invalid
				}`}
			>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formInputValid.name && <p>Please enter a valid name!</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputValid.street ? '' : classes.invalid
				}`}
			>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetRef} />
				{!formInputValid.street && <p>Please enter a valid street!</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputValid.postalCode ? '' : classes.invalid
				}`}
			>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalRef} />
				{!formInputValid.postalCode && (
					<p>Please enter a valid postal code!</p>
				)}
			</div>
			<div
				className={`${classes.control} ${
					formInputValid.city ? '' : classes.invalid
				}`}
			>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityRef} />
				{!formInputValid.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
