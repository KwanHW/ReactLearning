import { useState, useReducer } from 'react';

const initialState = {
	value: '',
	isTouched: false,
};

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { isTouched: state.isTouched, value: action.value };
	}
	if (action.type === 'BLUR') {
		return { isTouched: true, value: state.value };
	}
	if (action.type === 'RESET') {
		return { isTouched: false, value: '' };
	}
};

const useInput = (validate) => {
	const [inputState, dispatchInput] = useReducer(
		inputStateReducer,
		initialState
	);

	// const [enteredVal, setEnteredVal] = useState('');
	// const [isTouched, setIsTouched] = useState(false);

	const isValid = validate(inputState.value);
	const hasError = !isValid && inputState.isTouched;

	const valInputHandler = (e) => {
		dispatchInput({ type: 'INPUT', value: e.target.value });
	};

	const valInputBlurHandler = (e) => {
		dispatchInput({ type: 'BLUR' });
	};

	const reset = () => {
		dispatchInput({ type: 'RESET' });
	};

	return {
		value: inputState.value,
		isValid,
		hasError,
		valInputHandler,
		valInputBlurHandler,
		reset,
	};
};

export default useInput;
