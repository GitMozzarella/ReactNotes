import styles from './note.module.scss'
import { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { INote } from '../../types/types'
import { getCurrentFullDate } from '../../utils/getCurrentFullDate'
import { getDate } from '../../utils/getDate'
import { getCurrentTime } from '../../utils/getCurrentTime'
import { ScrollArea } from '@mantine/core'
import { SimpleMdeReact } from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { newNote, additionalText } from '../../constants/variables'
import { Path } from '../../router/Path'

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
	const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const foundNote = notes.find(note => note.id === id)

		if (foundNote) {
			setNote(foundNote)
			setHeaderEdited(!!foundNote.headerNote)
			setTextEdited(!!foundNote.textNote)
		} else {
			navigate(Path.home)
		}
	}, [id, notes, navigate, setHeaderEdited, setTextEdited])

	const saveNote = useCallback(
		(updatedNote: INote) => {
			const updatedNoteDate = {
				...updatedNote,
				fullDate: getCurrentFullDate(),
				date: getDate(),
				time: getCurrentTime()
			}
			updateNote(updatedNoteDate)
		},
		[updateNote]
	)

	const handleHeaderChange: React.ChangeEventHandler<HTMLInputElement> =
		useCallback(
			event => {
				const value = event.target.value
				if (note) {
					setHeaderEdited(true)
					const updatedNote = { ...note, headerNote: value }
					setNote(updatedNote)
					if (saveTimeout) clearTimeout(saveTimeout)
					setSaveTimeout(setTimeout(() => saveNote(updatedNote), 300))
				}
			},
			[note, setHeaderEdited, setNote, saveTimeout, saveNote]
		)

	const handleTextChange = useCallback(
		(value: string) => {
			if (note) {
				setTextEdited(true)
				const updatedNote = { ...note, textNote: value }
				setNote(updatedNote)
				if (saveTimeout) clearTimeout(saveTimeout)
				setSaveTimeout(setTimeout(() => saveNote(updatedNote), 400))
			}
		},
		[note, setTextEdited, setNote, saveTimeout, saveNote]
	)

	return (
		<div className={styles.noteContainer}>
			{note && (
				<>
					<p className={styles.fullDate}>{note.fullDate}</p>
					<input
						type='text'
						value={headerEdited ? note.headerNote : ''}
						placeholder={newNote}
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
							placeholder={additionalText}
							className={styles.textNote}
						/>
					</ScrollArea>
				</>
			)}
		</div>
	)
}
