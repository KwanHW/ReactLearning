import { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm(props) {
	const [userInput, setUserInput] = useState({
		inputTitle: '',
		inputAmt: '',
		inputDate: '',
	});

	const titleChangeHandler = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, inputTitle: e.target.value };
		});
	};

	const amtChangeHandler = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, inputAmt: e.target.value };
		});
	};

	const dateChangeHandler = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, inputDate: e.target.value };
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const expenseData = {
			title: userInput.inputTitle,
			amount: +userInput.inputAmt,
			date: new Date(userInput.inputDate),
		};

		props.onSaveExpenseData(expenseData);

		// Clears the existing input
		setUserInput({
			inputTitle: '',
			inputAmt: '',
			inputDate: '',
		});

	 };

	return (
		<form onSubmit={submitHandler}>
			<div className="new-expense__controls">
				<div className="new-expense__control">
					<label>Title</label>
					<input
						type="text"
						value={userInput.inputTitle}
						onChange={titleChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Amount</label>
					<input
						type="number"
						min="0.01"
						step="0.01"
						value={userInput.inputAmt}
						onChange={amtChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Date</label>
					<input
						type="date"
						min="2019-01-01"
						max="2022-12-31"
						value={userInput.inputDate}
						onChange={dateChangeHandler}
					/>
				</div>
			</div>
			<div className="new-expense__actions">
				<button onClick={props.onCancel}>Cancel</button>
				<button type="submit">Add Expense</button>
			</div>
		</form>
	);
    
}

export default ExpenseForm;