import { createContext, useState } from 'react'

export interface AuthContextType {
	user: string | null
	signIn: (newUser: string, callback: () => void) => void
	signOut: (callback: () => void) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

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
