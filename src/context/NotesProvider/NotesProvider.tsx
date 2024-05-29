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
}

export const NotesContext = createContext<INotesContext>({
	darkMode: false,
	toggleDarkMode: () => {},
	notes: [],
	addNote: () => {}
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

	return (
		<NotesContext.Provider value={{ darkMode, toggleDarkMode, notes, addNote }}>
			{children}
		</NotesContext.Provider>
	)
}
