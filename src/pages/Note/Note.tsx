import styles from './note.module.scss'
import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NotesContext, INote } from '../../context/NotesProvider/NotesProvider'
import { getCurrentFullDate } from '../../utils/getCurrentFullDate'

export const Note = () => {
	const {
		notes,
		updateNote,
		setHeaderEdited,
		setTextEdited,
		headerEdited,
		textEdited
	} = useContext(NotesContext)
	const { id } = useParams<{ id: string }>()
	const [note, setNote] = useState<INote | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		const foundNote = notes.find(note => note.id === id)
		if (!foundNote) {
			navigate('/notfound')
		} else {
			setNote(foundNote)
		}
	}, [id, notes, navigate])

	const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (note) {
			setHeaderEdited(true)
			const updatedNote = { ...note, headerNote: e.target.value }
			setNote(updatedNote)
			updateNoteAndDate(updatedNote)
		}
	}

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (note) {
			setTextEdited(true)
			const updatedNote = { ...note, textNote: e.target.value }
			setNote(updatedNote)
			updateNoteAndDate(updatedNote)
		}
	}

	const updateNoteAndDate = (updatedNote: INote) => {
		const updatedNoteDate = {
			...updatedNote,
			fullDate: getCurrentFullDate()
		}
		updateNote(updatedNoteDate)
	}

	return (
		<div className={styles.noteContainer}>
			{note && (
				<>
					<p className={styles.fullDate}>{note.fullDate}</p>
					<input
						type='text'
						value={headerEdited ? note.headerNote : ''}
						placeholder='Новая заметка'
						onChange={handleHeaderChange}
						className={styles.headerNote}
						maxLength={25}
					/>
					<textarea
						value={textEdited ? note.textNote : ''}
						placeholder='Текст заметки...'
						onChange={handleTextChange}
						className={styles.textNote}
						maxLength={3500}
					></textarea>
				</>
			)}
		</div>
	)
}
