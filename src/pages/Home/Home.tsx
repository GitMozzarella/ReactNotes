import React from 'react'
import styles from './home.module.scss'

export const Home: React.FC = () => {
	const isDarkTheme = false

	return (
		<div
			className={`${styles.container} ${isDarkTheme ? styles.darkTheme : ''}`}
		>
			<h1 className={styles.title}>Добро пожаловать в React-Notes!</h1>
			<p className={styles.text}>
				Это приложение предназначено для управления вашими заметками. Мы
				использовали самые современные технологии, включая:
			</p>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<strong className={styles.highlight}>React</strong> - библиотека для
					создания динамических пользовательских интерфейсов
				</li>
				<li className={styles.listItem}>
					<strong className={styles.highlight}>TypeScript</strong> - надстройка
					над JavaScript, обеспечивающая статическую типизацию
				</li>
				<li className={styles.listItem}>
					<strong className={styles.highlight}>Context API</strong> - система
					управления состоянием, встроенная в React
				</li>
				<li className={styles.listItem}>
					<strong className={styles.highlight}>React Router DOM</strong> -
					библиотека для маршрутизации в React-приложениях
				</li>
			</ul>
			<p className={styles.text}>
				Оцените удобство и функциональность нашего приложения. Начните управлять
				своими заметками уже сегодня!
			</p>
		</div>
	)
}
