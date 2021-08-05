import React, {useState} from 'react'
import Output from './Output'

function Greeting() {
	const [changedText, setChangedText] = useState(false)

	return (
		<div>
		<h2>Hello World!</h2>	
			{!changedText && <Output>It's good to see you</Output>}
			{changedText && <Output>Changed!</Output>}
		<button onClick={() => {
			setChangedText(true)
		}} />
		</div>
	)
}

export default Greeting
