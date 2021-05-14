import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

function NewExpense(props) {
    const [showExpenseForm, toggleExpenseForm] = useState(false);

	const toggleExpenseHandler = () => {
		toggleExpenseForm((isShown) => {
			return !isShown;
		});
	};

	const saveExpenseDataHandler = (enteredExpense) => {
		const expenseData = {
			...enteredExpense,
			id: Math.random().toString(),
		};
		props.onAddExpense(expenseData);
	};

	const showForm = showExpenseForm ? (
		<ExpenseForm
			onSaveExpenseData={saveExpenseDataHandler}
			onCancel={toggleExpenseHandler}
		/>
	) : (
		<button onClick={toggleExpenseHandler}>Add new Expense</button>
	);

	return <div className="new-expense">{showForm}</div>;

}

export default NewExpense;