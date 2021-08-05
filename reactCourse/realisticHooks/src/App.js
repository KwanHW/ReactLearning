import React, { useEffect, useState, useCallback } from 'react';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';
import useHttp from './hooks/use-http';

function App() {
	const [tasks, setTasks] = useState([]);

	const transformTasks = useCallback((data) => {
		const loadedTasks = [];

		for (const taskKey in data) {
			loadedTasks.push({ id: taskKey, text: data[taskKey].text });
		}

		setTasks(loadedTasks);
	},[]);

	const {
		isLoading,
		error,
		sendRequest: fetchTasks,
	} = useHttp();

	useEffect(() => {
    fetchTasks(transformTasks,{});
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
