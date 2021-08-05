import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const authContext = useContext(AuthContext);

	const isLoggedIn = authContext.isLoggedIn;

	const logoutHandler = () => {
		authContext.logout();
	};

	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!isLoggedIn && (
						<li>
							<Link to="/auth">Login</Link>
						</li>
					)}
					{isLoggedIn && (
						<React.Fragment>
							<li>
								<Link to="/profile">Profile</Link>
							</li>
							<li>
								<button onClick={logoutHandler}>Logout</button>
							</li>
						</React.Fragment>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
