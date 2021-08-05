import useCounter from '../hooks/use-counter';

import Card from './Card';

const BackwardCounter = () => {
	const counter = useCounter((count) => count - 1);
	// const [counter, setCounter] = useState(0);

	// useEffect(() => {
	//   const interval = setInterval(() => {
	//     setCounter((prevCounter) => prevCounter - 1);
	//   }, 1000);

	//   return () => clearInterval(interval);
	// }, []);

	return <Card>{counter}</Card>;
};

export default BackwardCounter;
