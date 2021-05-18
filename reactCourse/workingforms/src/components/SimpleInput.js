import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valInputHandler: nameChangeHandler,
		valInputBlurHandler: nameBlurHandler,
		reset: nameReset,
	} = useInput((value) => value.trim() !== '');

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		valInputHandler: emailChangeHandler,
		valInputBlurHandler: emailBlurHandler,
		reset: emailReset,
	} = useInput((value) => value.includes('@'));

	const formIsValid = nameIsValid && emailIsValid;

	const formSubmissionHandler = (e) => {
		e.preventDefault();

		if (!nameIsValid) {
			return;
		}

		console.log(enteredName);
		nameReset();
		emailReset();
	};

	const nameInputClasses = nameHasError
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = emailHasError
		? 'form-control invalid'
		: 'form-control';

	console.log(nameInputClasses, emailInputClasses);
	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameHasError && (
					<p className="error-text">Name must not be empty!</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="name">E-Mail</label>
				<input
					type="email"
					id="email"
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailHasError && (
					<p className="error-text">Please enter a valid E-mail!</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
