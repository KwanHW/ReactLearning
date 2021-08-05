import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://react-http-8866e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const respData = await response.json();

			const loadedMeals = [];
			for (const key in respData) {
				loadedMeals.push({
					id: key,
					name: respData[key].name,
					description: respData[key].description,
					price: parseFloat(respData[key].price),
				});
			}

			setMeals(loadedMeals);
		};

		fetchMeals().catch((error) => setError(error.message));
		setIsLoading(false);
	}, []);

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading....</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className={classes.mealsError}>
				<p>{error}</p>
			</section>
		);
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
