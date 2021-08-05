import { useReducer, useCallback } from 'react';

const initState = {
	loading: false,
	error: '',
	data: null,
	extra: null,
	identifier: null,
};

const httpReducer = (httpState, action) => {
	switch (action.type) {
		case 'SEND':
			return {
				loading: true,
				error: '',
				data: null,
				extra: action.extra,
				identifier: action.identifier,
			};
		case 'ERROR':
			return { loading: false, error: action.error };
		case 'SUCCESS':
			return {
				loading: false,
				error: '',
				data: action.data,
				extra: null,
			};
		case 'CLEAR':
			return initState;
		default:
			throw new Error('Something happened');
	}
};

const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, initState);

	const clear = () => {
		dispatchHttp({ type: 'CLEAR' });
	};

	const sendRequest = useCallback((url, method, body, extra, identifier) => {
		dispatchHttp({ type: 'SEND', extra, identifier });
		fetch(url, {
			method,
			body,
			headers: { 'Content-Type': 'application/json' },
		})
			.then((resp) => resp.json())
			.then((data) => {
				dispatchHttp({ type: 'SUCCESS', data });
			})
			.catch((error) => {
				dispatchHttp({ type: 'ERROR', error: 'Something went wrong!' });
			});
	}, []);

	return { ...httpState, sendRequest, clear };
};
export default useHttp;
