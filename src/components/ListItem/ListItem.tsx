import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './listitem.module.scss'
import { ScrollArea } from '@mantine/core'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { getDate } from '../../utils/getDate'
import { Loading } from '../Loading'
import { emptyArrayNotes } from '../../constants/variables'
import { newNote, additionalText } from '../../constants/variables'
import { Path } from '../../router/Path'

export const ListItem = () => {
	const { notes, confirmDeleteNote, loading } = useContext(NotesContext)
	const navigate = useNavigate()

	const handleEditClick = (id: string) => {
		navigate(`${Path.notes}/${id}`)
	}

	return (
		<ScrollArea
			type='scroll'
			scrollbarSize={10}
			offsetScrollbars
			className={styles.scrollArea}
		>
			{loading ? (
				<Loading />
			) : (
				<ul className={styles.list}>
					{notes.length === 0 ? (
						<li className={styles.noNotes}>{emptyArrayNotes} </li>
					) : (
						notes.map(note => (
							<li key={note.id} className={styles.note}>
								<p className={styles.headerNote}>
									{note.headerNote || newNote}
								</p>
								<div className={styles.noteInfo}>
									<p className={styles.timeNote}>
										{note.date === getDate() ? note.time : note.date}
									</p>
									<p className={styles.textNote}>
										{note.textNote || additionalText}
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
										onClick={() => confirmDeleteNote(note.id)}
									>
										<MdDelete />
									</button>
								</div>
							</li>
						))
					)}
				</ul>
			)}
		</ScrollArea>
	)
}
