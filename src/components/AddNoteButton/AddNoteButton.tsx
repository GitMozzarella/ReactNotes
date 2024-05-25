import { useContext } from 'react'
import styles from './addButton.module.scss'
import { Button } from '@mantine/core'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { MdOutlineNoteAdd } from 'react-icons/md'

export const AddNoteButton = () => {
	const { darkMode } = useContext(NotesContext)

	return (
		<Button
			className={`${styles.addButton} ${darkMode ? styles.darkMode : ''}`}
		>
			Добавить заметку
			<MdOutlineNoteAdd className={styles.icon} />
		</Button>
	)
}
