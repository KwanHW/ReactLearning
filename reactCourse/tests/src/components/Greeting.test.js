import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Greeting from './Greeting'

describe('Greeting Component', () => {

	test('renders Hello World', () => {
		// Arrange (set up the test environment)
		render(<Greeting />)
	
		// Act (Run logic of test function)
	
		// Assert (Compare execution results with expected results)
		const helloWorldElement = screen.getByText('Hello World!')
		expect(helloWorldElement).toBeInTheDocument()
	})

	test("renders 'It's good to see you' (button not clicked)", () => {
		render(<Greeting />)

		const textNotChanged = screen.getByText("It's good to see you");
		expect(textNotChanged).toBeInTheDocument()
	})

	test("renders 'Changed!' (button clicked)", () => {
		render(<Greeting />)

		// Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement)	

		const textChanged = screen.getByText("Changed!");

		expect(textChanged).toBeInTheDocument()
	})

	test("does not render 'It's good to see you' when button clicked", () => {
			render(<Greeting />)

		// Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement)	

		const textChanged = screen.queryByText("It's good to see you");

		expect(textChanged).toBeNull();
	} )
})

