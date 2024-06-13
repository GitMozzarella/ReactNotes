import styles from './note.module.scss'
import { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NotesContext, INote } from '../../context/NotesProvider/NotesProvider'
import { getCurrentFullDate } from '../../utils/getCurrentFullDate'
import { getDate } from '../../utils/getDate'
import { getCurrentTime } from '../../utils/getCurrentTime'
import debounce from 'lodash/debounce'
import { ScrollArea } from '@mantine/core'
import { SimpleMdeReact } from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

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
				fullDate: getCurrentFullDate(),
				date: getDate(),
				time: getCurrentTime()
			}
			updateNote(updatedNoteDate)
		}, 900)
	}, [updateNote])
	const handleHeaderChange: React.ChangeEventHandler<HTMLInputElement> =
		useCallback(
			event => {
				const value = event.target.value
				if (note) {
					setHeaderEdited(true)
					const updatedNote = { ...note, headerNote: value }
					setNote(updatedNote)
					if (debouncedUpdateNoteRef.current) {
						debouncedUpdateNoteRef.current(updatedNote)
					}
				}
			},
			[note, setHeaderEdited, setNote, debouncedUpdateNoteRef]
		)

	const handleTextChange = useCallback(
		(value: string) => {
			if (note) {
				setTextEdited(true)
				const updatedNote = { ...note, textNote: value }
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
						<SimpleMdeReact
							value={textEdited ? note.textNote : ''}
							onChange={handleTextChange}
							placeholder='Текст заметки...'
						/>
					</ScrollArea>
				</>
			)}
		</div>
	)
}
