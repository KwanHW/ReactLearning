import {createSlice} from '@reduxjs/toolkit'
const initialCounterState = { value: 0, showCounter: true, };

const counterSlice = createSlice({
	name: 'counter', // Naming the slice
	initialState: initialCounterState,
	reducers: {
		increment(state) {
			console.log(state)
			state.value++;
		},
		decrement(state) {
			state.value--;
		},
		increase(state, action) {
			state.value += action.payload;
		},
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	},
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;