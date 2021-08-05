import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/useHttp';

const ingredientReducer = (currentIngredient, action) => {
	switch (action.type) {
		case 'SET':
			return action.ingredients;
		case 'ADD':
			return [...currentIngredient, action.ingredient];
		case 'DELETE':
			return currentIngredient.filter((ig) => ig.id !== action.id);
		default:
			throw new Error('Something happened');
	}
};

function Ingredients() {
	const [ingredients, dispatch] = useReducer(ingredientReducer, []);
	const { loading, error, data, extra, sendRequest, identifier, clear } =
		useHttp();

	useEffect(() => {
		if (loading) return;
		if (identifier === 'REMOVE_INGREDIENT')
			dispatch({ type: 'DELETE', id: extra });
		if (identifier === 'ADD_INGREDIENT')
			dispatch({ type: 'ADD', ingredient: { id: data, ...extra } });
		return () => {};
	}, [data, extra, identifier, loading]);

	const filteredIngredientHandler = useCallback((filteredIngredient) => {
		dispatch({ type: 'SET', ingredients: filteredIngredient });
	}, []);

	const addIngredientHandler = useCallback(
		(ingredient) => {
			sendRequest(
				'https://react-hooks-99a88-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json',
				'POST',
				JSON.stringify(ingredient),
				'ADD_INGREDIENT'
			);
		},
		[sendRequest]
	);

	const removeIngredientHandler = useCallback(
		(ingredientId) => {
			sendRequest(
				`https://react-hooks-99a88-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients/${ingredientId}.json`,
				'DELETE',
				'REMOVE_INGREDIENT'
			);
		},
		[sendRequest]
	);

	const ingredientList = useMemo(
		() => (
			<IngredientList
				ingredients={ingredients}
				onRemoveItem={removeIngredientHandler}
			/>
		),
		[ingredients, removeIngredientHandler]
	);

	return (
		<div className="App">
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
			<IngredientForm onAdd={addIngredientHandler} loading={loading} />

			<section>
				<Search onFilter={filteredIngredientHandler} />
				{ingredientList}
			</section>
		</div>
	);
}

export default Ingredients;
