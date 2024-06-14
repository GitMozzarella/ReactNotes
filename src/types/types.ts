import { User } from 'firebase/auth'

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
	loading: boolean
}

export interface AuthContextType {
	user: User | null
	signIn: (
		email: string,
		password: string,
		callback: () => void,
		catcher: () => void
	) => void
	signUp: (
		email: string,
		password: string,
		name: string,
		callback: () => void
	) => void
	signOut: (callback: () => void) => void
	signInWithGoogle: (callback: () => void) => void
}
export interface FormValues {
	email: string
	name: string
	password: string
}
