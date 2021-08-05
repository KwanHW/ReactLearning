import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = (props) => {
	const { isAuth } = useContext(AuthContext);
	return isAuth ? <Ingredients /> : <Auth />;
	// return <Ingredients />;
	// return <Auth />
};

export default App;
