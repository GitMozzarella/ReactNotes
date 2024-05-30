import { createContext, useState } from 'react'
import { useToggle } from '../../hooks/useToggle'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentTime } from '../../utils/getCurrentTime'
import { getCurrentFullDate } from '../../utils/getCurrentFullDate'
import { getDate } from '../../utils/getDate'
export interface INote {
	id: string
	headerNote: string
	time?: string
	fullDate?: string
	date?: string
	textNote: string
}

export interface INotesContext {
	darkMode: boolean
	toggleDarkMode: () => void
	notes: INote[]
	addNote: () => void
	deleteNote: (id: string) => void
	updateNote: (updatedNote: INote) => void
}

export const NotesContext = createContext<INotesContext>({
	darkMode: false,
	toggleDarkMode: () => {},
	notes: [],
	addNote: () => {},
	deleteNote: () => {},
	updateNote: () => {}
})

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkMode, toggleDarkMode] = useToggle(false)
	const [notes, setNotes] = useState<INote[]>([])

	const addNote = () => {
		const newNote: INote = {
			id: uuidv4(),
			headerNote: 'Новая заметка',
			time: getCurrentTime(),
			fullDate: getCurrentFullDate(),
			date: getDate(),
			textNote: 'Текст заметки...'
		}
		setNotes([...notes, newNote])
	}

	const deleteNote = (id: string) => {
		setNotes(notes.filter(note => note.id !== id))
	}

	const updateNote = (updatedNote: INote) => {
		setNotes(
			notes.map(note => (note.id === updatedNote.id ? updatedNote : note))
		)
	}

	return (
		<NotesContext.Provider
			value={{
				darkMode,
				toggleDarkMode,
				notes,
				addNote,
				deleteNote,
				updateNote
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}
