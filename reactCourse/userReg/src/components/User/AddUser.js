import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

function AddUser(props) {
	const [inputName, setName] = useState('');
	const [inputAge, setAge] = useState('');
	const [error, setError] = useState();

	const nameChangeHandler = (e) => {
		setName(e.target.value);
	};

	const ageChangeHandler = (e) => {
		setAge(e.target.value);
	};

	const errorHandler = () => {
		setError(null);
	};

	const addUserHandler = (e) => {
		e.preventDefault();

		if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
			setError({
				title: 'Invalid input',
				message: 'Please enter a valid name and age (non-empty values)',
			});
			return;
		}

		if (+inputAge < 1) {
			setError({
				title: 'Invalid age',
				message: 'Please enter a valid age (> 0)',
			});
			return;
		}

		props.onAddUser({
			id: Math.random().toString(),
			name: inputName,
			age: inputAge,
		});
		setName('');
		setAge('');
	};

	return (
		<div>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onNotify={errorHandler}
				/>
			)}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						onChange={nameChangeHandler}
						value={inputName}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						type="number"
						id="age"
						onChange={ageChangeHandler}
						value={inputAge}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
}

export default AddUser;
