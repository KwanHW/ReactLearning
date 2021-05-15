import styles from './ErrorModal.module.css'
import Button from "./Button";
import Card from "./Card";

function ErrorModal(props) {
    
    return (
        <div>
            <div className={styles.backdrop} onClick={props.onNotify}>
                <Card className={styles.modal}>
                    <header className={styles.header}>
                        <h2>{props.title}</h2>
                    </header >
                    <div className={styles.content}>
                        <p>{props.message}</p>
                    </div>
                    <footer className={styles.actions}>
                        <Button onClick={props.onNotify}>Okay</Button>
                    </footer>
                </Card>
            </div>
        </div>
    )
}

export default ErrorModal;