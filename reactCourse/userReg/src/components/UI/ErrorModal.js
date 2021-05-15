import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ErrorModal.module.css';
import Button from './Button';
import Card from './Card';

// Would usually be a file on its own if needed elsewhere
function Backdrop(props) {
	return <div className={styles.backdrop} onClick={props.onNotify} />;
}

function ModalOverlay(props) {
	return (
		<Card className={styles.modal}>
			<header className={styles.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={styles.content}>
				<p>{props.message}</p>
			</div>
			<footer className={styles.actions}>
				<Button onClick={props.onNotify}>Okay</Button>
			</footer>
		</Card>
	);
}

function ErrorModal(props) {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<Backdrop onNotify={props.onNotify} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					title={props.title}
					message={props.message}
					onNotify={props.onNotify}
				/>,
				document.getElementById('modal-root')
			)}
		</React.Fragment>
	);
}

export default ErrorModal;
