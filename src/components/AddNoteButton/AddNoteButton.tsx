import { useContext } from 'react'
import styles from './addButton.module.scss'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { MdOutlineNoteAdd } from 'react-icons/md'
import { addButton } from '../../constants/variables'

export const AddNoteButton = () => {
	const { addNote, darkMode } = useContext(NotesContext)

	const handleAddNote = () => {
		addNote()
	}

	return (
		<div className={styles.wrapper}>
			<button
				className={`${styles.addButton} ${darkMode ? styles.darkMode : ''}`}
				onClick={handleAddNote}
			>
				{addButton}
				<MdOutlineNoteAdd className={styles.icon} />
			</button>
		</div>
	)
}
