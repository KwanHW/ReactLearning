import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTask } = useHttp();

	const postTask = (taskText, data) => {
		const generatedId = data.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		const postConfig = {
			method: 'POST',
			body: { text: taskText },
			headers: {
				'Content-Type': 'application/json',
			},
		};
		sendTask(postTask.bind(null,taskText),postConfig);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
