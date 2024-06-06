import { createContext, useState } from 'react'
import '@mantine/notifications/styles.css'
import { useToggle } from '../../hooks/useToggle'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentTime } from '../../utils/getCurrentTime'
import { getCurrentFullDate } from '../../utils/getCurrentFullDate'
import { getDate } from '../../utils/getDate'
import { useNavigate } from 'react-router-dom'
import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
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
	confirmDeleteNote: (id: string) => void
	deleteNote: (id: string) => void
	updateNote: (updatedNote: INote) => void
	setHeaderEdited: (edited: boolean) => void
	setTextEdited: (edited: boolean) => void
	headerEdited: boolean
	textEdited: boolean
}

export const NotesContext = createContext<INotesContext>({
	darkMode: false,
	toggleDarkMode: () => {},
	notes: [],
	addNote: () => {},
	confirmDeleteNote: () => {},
	deleteNote: () => {},
	updateNote: () => {},
	setHeaderEdited: () => {},
	setTextEdited: () => {},
	headerEdited: false,
	textEdited: false
})

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkMode, toggleDarkMode] = useToggle(false)
	const [notes, setNotes] = useState<INote[]>([])
	const [headerEdited, setHeaderEdited] = useState(false)
	const [textEdited, setTextEdited] = useState(false)
	const navigate = useNavigate()

	const addNote = () => {
		const newNote: INote = {
			id: uuidv4(),
			headerNote: '',
			time: getCurrentTime(),
			fullDate: getCurrentFullDate(),
			date: getDate(),
			textNote: ''
		}
		setNotes([...notes, newNote])
	}

	const deleteNote = (id: string) => {
		setNotes(notes.filter(note => note.id !== id))
		notifications.show({
			title: 'Note deleted',
			message: 'Your note was successfully deleted.',
			autoClose: 3000,
			color: 'blue'
		})
		navigate('/notes')
	}

	const confirmDeleteNote = (id: string) => {
		modals.openConfirmModal({
			title: 'Delete your note',
			centered: true,
			children: (
				<Text size='sm'>Are you sure you want to delete this note?</Text>
			),
			labels: { confirm: 'Delete', cancel: 'No' },
			confirmProps: { color: 'blue' },
			onCancel: () => console.log('Cancel'),
			onConfirm: () => deleteNote(id)
		})
	}

	const updateNote = (updatedNote: INote) => {
		const currentTime = getCurrentTime()
		const updatedNoteTime = { ...updatedNote, time: currentTime }
		setNotes(
			notes.map(note => (note.id === updatedNote.id ? updatedNoteTime : note))
		)
	}

	return (
		<NotesContext.Provider
			value={{
				darkMode,
				toggleDarkMode,
				notes,
				addNote,
				confirmDeleteNote,
				deleteNote,
				updateNote,
				setHeaderEdited,
				setTextEdited,
				headerEdited,
				textEdited
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}
