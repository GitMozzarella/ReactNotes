import { useContext } from 'react'
import styles from './addButton.module.scss'
import { Button } from '@mantine/core'
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
			<Button
				variant='filled'
				className={`${styles.addButton} ${darkMode ? styles.darkMode : ''}`}
				style={{ width: '90%', height: '40px', backgroundColor: '#666666' }}
				onClick={handleAddNote}
			>
				{addButton}
				<MdOutlineNoteAdd className={styles.icon} />
			</Button>
		</div>
	)
}
