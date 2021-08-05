import React, { useState, useEffect, useRef } from 'react';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/useHttp';

const Search = React.memo(({ onFilter }) => {
	const [query, setQuery] = useState('');
	const queryRef = useRef();
	const { loading, data, error, sendRequest, clear } = useHttp();

	useEffect(() => {
		const timer = setTimeout(() => {
			if (query !== queryRef.current.value) return;
			const queryParams =
				query.length === 0 ? '' : `?orderBy="title"&equalTo="${query}"`;

			sendRequest(
				'https://react-hooks-99a88-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json' +
					queryParams,
				'GET'
			);
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [query, queryRef, onFilter, sendRequest]);

	useEffect(() => {
		if (loading) return;
		const loadedIngredients = [];
		for (const key in data) {
			loadedIngredients.push({
				id: key,
				...data[key],
			});
		}
		onFilter(loadedIngredients);

		return () => {};
	}, [data, loading, error, sendRequest, onFilter]);

	return (
		<section className="search">
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					{loading && <span>Loading....</span>}
					<input
						type="text"
						ref={queryRef}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
