import React, { useCallback, useState, useEffect } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const calcRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const expireInMs = new Date(expirationTime).getTime();

	const remainingDuration = expireInMs - currentTime;

	return remainingDuration;
};

const getStoredToken = () => {
	const initToken = localStorage.getItem('token');
	const expiration = localStorage.getItem('expiry');

	const remainingTime = calcRemainingTime(expiration);

	if (remainingTime <= 60000) {
		localStorage.clear();
		return null;
	}

	return { token: initToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
	const tokenData = getStoredToken();
	let initToken;
	if (tokenData) {
		initToken = tokenData.token;
	}
	const [token, setToken] = useState(initToken);

	const userIsLoggedIn = !!token;

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('expiry', expirationTime);

		const remainingTime = calcRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.clear();

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	useEffect(() => {
		if (tokenData) {
			console.log(tokenData.duration);
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [logoutHandler, tokenData]);

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};
	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
