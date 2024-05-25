import { createContext } from 'react'
import { useToggle } from '../../hooks/useToggle'

export interface INote {}

export interface INotesContext {
	darkMode: boolean
	toggleDarkMode: () => void
}

export const NotesContext = createContext<INotesContext>({
	darkMode: false,
	toggleDarkMode: () => {}
})

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [darkMode, toggleDarkMode] = useToggle(false)

	return (
		<NotesContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</NotesContext.Provider>
	)
}
