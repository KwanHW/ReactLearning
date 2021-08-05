import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/AuthContext';

const AuthForm = () => {
	const history = useHistory();
	const emailInput = useRef();
	const pwInput = useRef();
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const authContext = useContext(AuthContext);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const email = emailInput.current.value;
		const password = pwInput.current.value;
		const userData = { email, password, returnSecureToken: true };

		// Optional: validation
		setIsLoading(true);
		const url = isLogin
			? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCr70mfVgb93brpv0jGbsySQHI1wL4F-70'
			: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCr70mfVgb93brpv0jGbsySQHI1wL4F-70';

		const requestData = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		};

		fetch(url, requestData)
			.then((res) => {
				setIsLoading(false);
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((data) => {
						let errorMessage = 'Authentication Failed';
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				const expirationTime = new Date(
					new Date().getTime() + +data.expiresIn * 1000
				);
				authContext.login(data.idToken, expirationTime.toString());
				history.replace('/');
			})
			.catch((err) => alert(err.message));
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" ref={emailInput} required />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						ref={pwInput}
						required
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && <p>Loading</p>}
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin
							? 'Create new account'
							: 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
