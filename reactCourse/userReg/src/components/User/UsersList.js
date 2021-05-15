import styles from './UsersList.module.css';
import Card from '../UI/Card';

function UsersList(props) {
	const userItems = props.users.map((user) => {
		return (
			<li key={user.id}>
				{user.name} ({user.age} years old)
			</li>
		);
	});

	return (
		<Card className={styles.users}>
			<ul>{userItems}</ul>
		</Card>
	);
}

export default UsersList;
