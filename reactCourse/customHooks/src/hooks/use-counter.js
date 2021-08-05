import { useState, useEffect } from 'react';

const useCounter = (updatingFn) => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter(updatingFn);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

    return counter;
};

export default useCounter;
