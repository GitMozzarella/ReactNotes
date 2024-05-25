import { useContext } from 'react'
import { ListItem } from '../ListItem'
import styles from './sidebar.module.scss'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'

export const Sidebar = () => {
	const { darkMode } = useContext(NotesContext)

	return (
		<div className={`${darkMode ? styles.darkMode : styles.sidebar}`}>
			<ListItem />
		</div>
	)
}
