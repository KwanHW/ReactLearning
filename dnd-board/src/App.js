import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initData from './init-data';
import Column from './Column';

// const Container = styled.div`
// 	display: flex;
// `;

const Container = (props) => {
	return (
		<div {...props} ref={props.ref} style={{"display":"flex"}}>
			{props.children}
		</div>
	)
}


function App() {
	const [tasks, setTasks] = useState(initData);

	const dragStartHandler = (start) => {
		// document.body.style.color = 'orange';
		// document.body.style.transition = 'background-color 0.2s ease';

		// Tracks the "starting point" of the drag
		const homeIndex = tasks.columnOrder.indexOf(start.source.droppableId);

		setTasks({
			...tasks,
			homeIndex,
		});
		console.log(tasks);
	};

	const dragUpdateHandler = (update) => {
		const { destination } = update;
		const opacity = destination
			? destination.index / Object.keys(tasks).length
			: 0;
		document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
	};

	const dragEndHandler = (result) => {
		setTasks({ ...tasks, homeIndex: null });

		document.body.style.color = 'inherit';
		document.body.style.backgroundColor = 'inherit';
		// console.log(tasks.columns)
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		// Checks if location of dragged is changed (user dropped item at its start pt)
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = tasks.columns[source.droppableId];
		const finish = tasks.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			// Read up more on splice() if unsure
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = { ...start, taskIds: newTaskIds };

			// console.log(newColumn)
			setTasks({
				...tasks,
				columns: { ...tasks.columns, [newColumn.id]: newColumn },
			});
			return;
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = { ...start, taskIds: startTaskIds };

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = { ...finish, taskIds: finishTaskIds };

		setTasks({
			...tasks,
			columns: {
				...tasks.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		});
	};

	const renderCols = tasks.columnOrder.map((colId, index) => {
		const column = tasks.columns[colId];
		const tasksInCol = column.taskIds.map((taskId) => tasks.tasks[taskId]);

		const isDropDisabled = index < tasks.homeIndex;

		return (
			<Column
				key={column.id}
				index={index}
				column={column}
				tasks={tasksInCol}
				isDropDisabled={isDropDisabled}
			/>
		);
	});

	return (
		// onDragStart and onDragUpdate are optional callbacks
		<DragDropContext onDragEnd={dragEndHandler}>
			<Droppable
				droppableId="all-cols"
				direction="horizontal"
				type="column"
			>
				{(provided) => {
					<Container
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{renderCols}
						{provided.placeholder}
					</Container>;
				}}
			</Droppable>
		</DragDropContext>
	);
}

export default App;
