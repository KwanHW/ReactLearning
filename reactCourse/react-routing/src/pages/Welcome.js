import { Route } from 'react-router-dom';
import React from 'react';

function Welcome() {
	return (
		<section>
			<h1>Welcome Page</h1>
            <Route path='/welcome/new-user'>
                <p>Welcome new user!</p>
            </Route>
		</section>
	);
}

export default Welcome;
