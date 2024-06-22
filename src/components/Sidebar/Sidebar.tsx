import { useContext } from 'react'
import { ListItem } from '../ListItem'
import styles from './sidebar.module.scss'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { AddNoteButton } from '../AddNoteButton/'
import { SearchInput } from '../SearchInput'

export const Sidebar = () => {
	const { darkMode } = useContext(NotesContext)

	return (
		<div className={`${darkMode ? styles.darkMode : styles.sidebar}`}>
			<SearchInput />
			<AddNoteButton />
			<ListItem />
		</div>
	)
}
