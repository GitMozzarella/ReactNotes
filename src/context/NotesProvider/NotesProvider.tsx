import { createContext, useState, useEffect } from 'react'
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
import { db, auth } from '../../firebaseConfig'
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
	query,
	where
} from 'firebase/firestore'

export interface INote {
	id: string
	headerNote: string
	time?: string
	fullDate?: string
	date?: string
	textNote: string
	userId?: string
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
	const [user, setUser] = useState(auth.currentUser)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchNotes = async () => {
			if (user) {
				const q = query(
					collection(db, 'notes'),
					where('userId', '==', user.uid)
				)
				const querySnapshot = await getDocs(q)
				const notesArray: INote[] = []
				querySnapshot.forEach(doc => {
					notesArray.push({ id: doc.id, ...doc.data() } as INote)
				})
				setNotes(notesArray)
			}
		}
		fetchNotes()
	}, [user])

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(currentUser => {
			setUser(currentUser)
		})
		return () => unsubscribe()
	}, [])

	const addNote = async () => {
		if (user) {
			const newNote: INote = {
				id: uuidv4(),
				headerNote: '',
				time: getCurrentTime(),
				fullDate: getCurrentFullDate(),
				date: getDate(),
				textNote: ''
			}
			const docRef = await addDoc(collection(db, 'notes'), {
				...newNote,
				userId: user.uid
			})
			setNotes([...notes, { ...newNote, id: docRef.id }])
		}
	}

	const deleteNote = async (id: string) => {
		await deleteDoc(doc(db, 'notes', id))
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

	const updateNote = async (updatedNote: INote) => {
		if (user) {
			const currentTime = getCurrentTime()
			const updatedNoteTime = { ...updatedNote, time: currentTime }
			await updateDoc(doc(db, 'notes', updatedNote.id), updatedNoteTime)
			setNotes(
				notes.map(note => (note.id === updatedNote.id ? updatedNoteTime : note))
			)
		}
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
