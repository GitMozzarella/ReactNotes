import styles from './note.module.scss'
import { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NotesContext, INote } from '../../context/NotesProvider/NotesProvider'
import { getCurrentFullDate } from '../../utils/getCurrentFullDate'
import debounce from 'lodash/debounce'
import { ScrollArea } from '@mantine/core'

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
	const [note, setNote] = useState<INote | null>(null)
	const navigate = useNavigate()
	const debouncedUpdateNoteRef = useRef<(updatedNote: INote) => void>()

	useEffect(() => {
		const foundNote = notes.find(note => note.id === id)

		if (foundNote) {
			setNote(foundNote)
			setHeaderEdited(!!foundNote.headerNote)
			setTextEdited(!!foundNote.textNote)
		} else {
			navigate('/')
		}
	}, [id, notes, navigate, setHeaderEdited, setTextEdited])

	useEffect(() => {
		debouncedUpdateNoteRef.current = debounce((updatedNote: INote) => {
			const updatedNoteDate = {
				...updatedNote,
				fullDate: getCurrentFullDate()
			}
			updateNote(updatedNoteDate)
		}, 900)
	}, [updateNote])

	const handleHeaderChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (note) {
				setHeaderEdited(true)
				const updatedNote = { ...note, headerNote: e.target.value }
				setNote(updatedNote)
				if (debouncedUpdateNoteRef.current) {
					debouncedUpdateNoteRef.current(updatedNote)
				}
			}
		},
		[note, setHeaderEdited, setNote, debouncedUpdateNoteRef]
	)

	const handleTextChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			if (note) {
				setTextEdited(true)
				const updatedNote = { ...note, textNote: e.target.value }
				setNote(updatedNote)
				if (debouncedUpdateNoteRef.current) {
					debouncedUpdateNoteRef.current(updatedNote)
				}
			}
		},
		[note, setTextEdited, setNote, debouncedUpdateNoteRef]
	)

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
					<ScrollArea
						type='scroll'
						scrollbarSize={10}
						offsetScrollbars
						className={styles.scrollArea}
					>
						<textarea
							value={textEdited ? note.textNote : ''}
							placeholder='Текст заметки...'
							onChange={handleTextChange}
							className={styles.textNote}
							maxLength={10000}
						></textarea>
					</ScrollArea>
				</>
			)}
		</div>
	)
}
