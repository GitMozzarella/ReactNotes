import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './listitem.module.scss'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { getDate } from '../../utils/getDate'

export const ListItem = () => {
	const { notes, deleteNote } = useContext(NotesContext)
	const navigate = useNavigate()

	const handleEditClick = (id: string) => {
		navigate(`/notes/${id}`)
	}

	return (
		<ul className={styles.list}>
			{notes.length === 0 ? (
				<li className={styles.noNotes}>Нет заметок</li>
			) : (
				notes.map(note => (
					<li key={note.id} className={styles.note}>
						<p className={styles.headerNote}>
							{note.headerNote || 'Новая заметка'}
						</p>
						<div className={styles.noteInfo}>
							<p className={styles.timeNote}>
								{note.date === getDate() ? note.time : note.date}
							</p>
							<p className={styles.textNote}>
								{note.textNote || 'Текст заметки...'}
							</p>
						</div>
						<div className={styles.buttons}>
							<button
								className={styles.editButton}
								onClick={() => handleEditClick(note.id)}
							>
								<MdModeEdit />
							</button>
							<button
								className={styles.deleteButton}
								onClick={() => deleteNote(note.id)}
							>
								<MdDelete />
							</button>
						</div>
					</li>
				))
			)}
		</ul>
	)
}
