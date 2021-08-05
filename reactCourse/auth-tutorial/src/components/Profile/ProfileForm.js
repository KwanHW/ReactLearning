import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/AuthContext';

const ProfileForm = () => {
	const history = useHistory();
	const newPasswordInput = useRef();
	const authContext = useContext(AuthContext);

	const submitHandler = (e) => {
		e.preventDefault();
		const newPassword = newPasswordInput.current.value;

		fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCr70mfVgb93brpv0jGbsySQHI1wL4F-70',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					idToken: authContext.token,
					password: newPassword,
					returnSecureToken: false,
				}),
			}
		).then((res) => history.replace('/'));
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					minLength="7"
					ref={newPasswordInput}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
