import styles from './note.module.scss'
import { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NotesContext, INote } from '../../context/NotesProvider/NotesProvider'
import { getCurrentFullDate } from '../../utils/getCurrentFullDate'
import debounce from 'lodash/debounce'

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
	const debouncedUpdateNoteRef = useRef<(updatedNote: INote) => void>()

	useEffect(() => {
		const foundNote = notes.find(note => note.id === id)
		if (!foundNote) {
			navigate('/notfound')
		} else {
			setNote(foundNote)
		}
	}, [id, notes, navigate])

	useEffect(() => {
		debouncedUpdateNoteRef.current = debounce((updatedNote: INote) => {
			const updatedNoteDate = {
				...updatedNote,
				fullDate: getCurrentFullDate()
			}
			updateNote(updatedNoteDate)
		}, 1100)
	}, [updateNote])

	const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (note) {
			setHeaderEdited(true)
			const updatedNote = { ...note, headerNote: e.target.value }
			setNote(updatedNote)
			debouncedUpdateNoteRef.current &&
				debouncedUpdateNoteRef.current(updatedNote)
		}
	}

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (note) {
			setTextEdited(true)
			const updatedNote = { ...note, textNote: e.target.value }
			setNote(updatedNote)
			debouncedUpdateNoteRef.current &&
				debouncedUpdateNoteRef.current(updatedNote)
		}
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
