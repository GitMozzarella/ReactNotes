import React, { createContext, useEffect, useState } from 'react'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut as firebaseSignOut,
	onAuthStateChanged,
	signInWithPopup,
	User,
	GoogleAuthProvider,
	updateProfile
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export interface AuthContextType {
	user: User | null
	signIn: (email: string, password: string, callback: () => void) => void
	signUp: (
		email: string,
		password: string,
		name: string,
		callback: () => void
	) => void
	signOut: (callback: () => void) => void
	signInWithGoogle: (callback: () => void) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	const signIn = (email: string, password: string, callback: () => void) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				setUser(userCredential.user)
				callback()
			})
			.catch(error => {
				console.error(error)
			})
	}

	const signUp = (
		email: string,
		password: string,
		name: string,
		callback: () => void
	) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				updateProfile(user, { displayName: name })
					.then(() => {
						setUser(user)
						callback()
					})
					.catch(error => {
						console.error(error)
					})
			})
			.catch(error => {
				console.error(error)
			})
	}

	const signOut = (callback: () => void) => {
		firebaseSignOut(auth)
			.then(() => {
				setUser(null)
				callback()
			})
			.catch(error => {
				console.error(error)
			})
	}

	const signInWithGoogle = (callback: () => void) => {
		const provider = new GoogleAuthProvider()
		signInWithPopup(auth, provider)
			.then(result => {
				setUser(result.user)
				callback()
			})
			.catch(error => {
				console.error(error)
			})
	}

	const value: AuthContextType = {
		user,
		signIn,
		signUp,
		signInWithGoogle,
		signOut
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
