import { useContext } from 'react'
import styles from './home.module.scss'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'

import { homeText } from '../../constants/messages'

export const Home: React.FC = () => {
	const { darkMode } = useContext(NotesContext)

	return (
		<div className={`${styles.container} ${darkMode ? styles.darkTheme : ''}`}>
			<h1 className={styles.title}>{homeText.title}</h1>
			<p className={styles.text}>{homeText.description}</p>
			<ul className={styles.list}>
				{homeText.listItems.map((item, index) => (
					<li key={index} className={styles.listItem}>
						<strong className={styles.highlight}>{item.highlight}</strong> -
						{item.text}
					</li>
				))}
			</ul>
		</div>
	)
}
