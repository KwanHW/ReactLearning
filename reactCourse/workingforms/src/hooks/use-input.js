import { useState } from 'react';

const useInput = (validate) => {
	const [enteredVal, setEnteredVal] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const isValid = validate(enteredVal);
	const hasError = !isValid && isTouched;

	const valInputHandler = (e) => {
		setEnteredVal(e.target.value);
	};

	const valInputBlurHandler = (e) => {
		setIsTouched(true);
        console.log(hasError)
	};

	const reset = () => {
		setEnteredVal('');
		setIsTouched(false);
	};

	return {
		value: enteredVal,
		isValid,
		hasError,
		valInputHandler,
		valInputBlurHandler,
		reset,
	};
};

export default useInput;
