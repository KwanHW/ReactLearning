import React, { Component } from 'react';
// connect is class-based equivalent
import { useSelector, useDispatch, connect } from 'react-redux';
import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
	// Subscription automatically set up
	const counter = useSelector((state) => state.counter.value);
  const showCounter = useSelector(state => state.counter.showCounter)
	const dispatch = useDispatch();

	const incrementHandler = () => {
    dispatch(counterActions.increment());
	};

	const increaseHandler = () => {
		dispatch(counterActions.increase(5));
	};

	const decrementHandler = () => {
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		dispatch(counterActions.toggleCounter());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={increaseHandler}>Increment by 5</button>
				<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {

//   }

//   render() {
//     return (
// 		<main className={classes.counter}>
// 			<h1>Redux Counter</h1>
// 			<div className={classes.value}>{this.props.value}</div>
// 			<div>
// 				<button onClick={this.incrementHandler.bind(this)}>Increment</button>
// 				<button onClick={this.decrementHandler.bind(this)}>Decrement</button>
// 			</div>
// 			<button onClick={this.toggleCounterHandler}>Toggle Counter</button>
// 		</main>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     value: state.value,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({type: 'decrement'}),
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
