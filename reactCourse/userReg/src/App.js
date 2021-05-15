import React, { useState } from 'react';
import AddUser from './components/User/AddUser';
import UsersList from './components/User/UsersList';

function App() {
	const [usersList, setUsersList] = useState([]);

	const addUserHandler = (user) => {
		setUsersList((prevList) => {
			return [...prevList, user];
		});
	};

	return (
		<div>
			<AddUser onAddUser={addUserHandler} />
			<UsersList users={usersList} />
		</div>
	);
}

export default App;
