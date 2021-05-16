import React from 'react';
import styles from './Header.module.css';
import mealImg from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
	return (
		<React.Fragment>
			<header className={styles.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onShowCart={props.onShowCart}/>
			</header>
			<div className={styles['main-image']}>
				<img src={mealImg} alt="Table of food" />
			</div>
		</React.Fragment>
	);
}

export default Header;
