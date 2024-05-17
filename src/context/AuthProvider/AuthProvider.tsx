import { createContext, useContext, useState } from 'react'

const AuthContext = createContext<AuthContextType | null>(null)

export interface AuthContextType {
	user: string | null
	signIn: (newUser: string, callback: () => void) => void
	signOut: (callback: () => void) => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error()
	}
	return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<string | null>(() => {
		return localStorage.getItem('user')
	})

	const signIn = (newUser: string, callback: () => void) => {
		setUser(newUser)
		localStorage.setItem('user', newUser)
		callback()
	}
	const signOut = (callback: () => void) => {
		setUser(null)
		localStorage.removeItem('user')
		callback()
	}

	const value: AuthContextType = {
		user,
		signIn,
		signOut
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
