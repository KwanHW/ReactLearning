import React, { useState, useRef } from 'react';
import Wrapper from '../Helpers/Wrapper';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

function AddUser(props) {
	const nameRef = useRef('');
	const ageRef = useRef('');

	const [error, setError] = useState();

	const errorHandler = () => {
		setError(null);
	};

	const addUserHandler = (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const age = ageRef.current.value;

		if (name.trim().length === 0 || age.trim().length === 0) {
			setError({
				title: 'Invalid input',
				message: 'Please enter a valid name and age (non-empty values)',
			});
			return;
		}

		if (+age < 1) {
			setError({
				title: 'Invalid age',
				message: 'Please enter a valid age (> 0)',
			});
			return;
		}

		props.onAddUser({
			id: Math.random().toString(),
			name,
			age,
		});

		nameRef.current.value = '';
		ageRef.current.value = '';
	};

	return (
		<Wrapper>
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
					<input type="text" id="username" ref={nameRef} />
					<label htmlFor="age">Age (Years)</label>
					<input type="number" id="age" ref={ageRef} />
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
}

export default AddUser;
