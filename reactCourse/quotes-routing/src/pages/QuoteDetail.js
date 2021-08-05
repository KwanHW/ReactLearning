import React, { useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const DUMMY_QUOTES = [
	{ id: 'q1', author: 'Max', text: 'Learning React is fun!' },
	{ id: 'q2', author: 'Max', text: 'Learning React is great!' },
];

function QuoteDetail() {
	const params = useParams();
	const match = useRouteMatch();
	const { quoteId } = params;

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	// const loadedQuote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

	if (status === 'pending') {
		return <LoadingSpinner />;
	}

	if (error) {
		return <p className="centered">{error}</p>;
	}

	if (!loadedQuote.text) {
		return <p>No quote found</p>;
	}

	return (
		<React.Fragment>
			<HighlightedQuote
				text={loadedQuote.text}
				author={loadedQuote.author}
			/>
			<Route path={match.path} exact>
				<div className="centered">
					<Link to={`${match.url}/comments`} className="btn--flat">
						Load Comments
					</Link>
				</div>
			</Route>
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
		</React.Fragment>
	);
}

export default QuoteDetail;
