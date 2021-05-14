import { useState } from 'react';
import './Expenses.css';
import Card from '../UI/Card';
import ExpensesChart from './ExpensesChart';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';

function Expenses(props) {
	const [yearSelected, setYearInput] = useState('2021');

	const yearChangeHandler = (yr) => {
		setYearInput(yr);
		// console.log(yr);
	};

	const filteredExpenses = props.expenses.filter((item) => {
		return item.date.getFullYear().toString() === yearSelected;
	});

	return (
		<div>
			<Card className="expenses">
				<ExpensesFilter
					onYrChange={yearChangeHandler}
					selectedYr={yearSelected}
				/>
				<ExpensesChart expenses={filteredExpenses} />
				<ExpensesList items={filteredExpenses} />
			</Card>
		</div>
	);
}

export default Expenses;
