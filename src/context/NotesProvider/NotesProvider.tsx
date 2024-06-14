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
import { INote, INotesContext } from '../../types/types'
import { Path } from '../../router/Path'
import { messages } from './../../constants/messages'
import { ErrorMessages } from '../../constants/errorMessages'

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
	textEdited: false,
	loading: true
})

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkMode, toggleDarkMode] = useToggle(false)
	const [notes, setNotes] = useState<INote[]>([])
	const [headerEdited, setHeaderEdited] = useState(false)
	const [textEdited, setTextEdited] = useState(false)
	const [loading, setLoading] = useState(true)
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
				setLoading(false)
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
		try {
			await deleteDoc(doc(db, 'notes', id))
			setNotes(notes.filter(note => note.id !== id))
			notifications.show({
				title: messages.notification,
				message: messages.confirmDelete,
				autoClose: 3000,
				color: 'blue'
			})
			navigate(Path.notes)
		} catch (error) {
			console.error(ErrorMessages.errorDelete, error)
			notifications.show({
				title: ErrorMessages.error,
				message: ErrorMessages.errorDeleteMessage,
				autoClose: 3000,
				color: 'red'
			})
		}
	}

	const confirmDeleteNote = (id: string) => {
		modals.openConfirmModal({
			title: messages.delete,
			centered: true,
			children: <Text size='sm'>{messages.confirmMessage}</Text>,
			labels: { confirm: 'Да', cancel: 'Нет' },
			confirmProps: { color: 'blue' },
			onCancel: () => console.log('Cancel'),
			onConfirm: () => deleteNote(id)
		})
	}

	const updateNote = async (updatedNote: INote) => {
		if (user) {
			const currentTime = getCurrentTime()
			const updatedNoteTime = { ...updatedNote, time: currentTime }
			try {
				await updateDoc(doc(db, 'notes', updatedNote.id), updatedNoteTime)
				setNotes(
					notes.map(note =>
						note.id === updatedNote.id ? updatedNoteTime : note
					)
				)
			} catch (error) {
				console.error(ErrorMessages.errorUpdate, error)
			}
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
				textEdited,
				loading
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}
