import { useState, useCallback } from 'react';

// Would put the DB URL in the params but for now its a constant
const useHttp = () => {
	const DB_URL =
		'https://react-http-8866e-default-rtdb.asia-southeast1.firebasedatabase.app';
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async (applyData,reqInfo) => {
			setIsLoading(true);
			setError(null);
			try {
				console.log(`${DB_URL}/tasks.json`);
				const response = await fetch(`${DB_URL}/tasks.json`, {
					method: reqInfo.method ? reqInfo.method : 'GET',
					body: reqInfo.body ? JSON.stringify(reqInfo.body) : null,
					headers: reqInfo.headers ? reqInfo.headers : {},
				});

				if (!response.ok) {
					throw new Error('Request failed!');
				}

				const data = await response.json();

				applyData(data);
			} catch (err) {
				setError(err.message || 'Something went wrong!');
			}
			setIsLoading(false);
		},
		[]
	);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;
