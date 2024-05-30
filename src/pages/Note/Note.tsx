import styles from './note.module.scss'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { NotesContext, INote } from '../../context/NotesProvider/NotesProvider'

export const Note = () => {
	const { notes, updateNote } = useContext(NotesContext)
	const { id } = useParams<{ id: string }>()
	const [note, setNote] = useState<INote | undefined>(undefined)

	useEffect(() => {
		const foundNote = notes.find(note => note.id === id)
		setNote(foundNote)
	}, [id, notes])

	const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (note) {
			const updatedNote = { ...note, headerNote: e.target.value }
			setNote(updatedNote)
			updateNote(updatedNote)
		}
	}

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (note) {
			const updatedNote = { ...note, textNote: e.target.value }
			setNote(updatedNote)
			updateNote(updatedNote)
		}
	}

	if (!note) {
		return <div>Заметка не найдена</div>
	}

	return (
		<div className={styles.noteContainer}>
			<p className={styles.fullDate}>{note.fullDate}</p>
			<input
				type='text'
				value={note.headerNote}
				placeholder='Новая заметка'
				onChange={handleHeaderChange}
				className={styles.headerNote}
				maxLength={25}
			/>
			<textarea
				value={note.textNote}
				onChange={handleTextChange}
				placeholder='Текст заметки...'
				className={styles.textNote}
			></textarea>
		</div>
	)
}
