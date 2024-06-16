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
import { AuthContextType } from '../../types/types'
import { userString } from '../../constants/variables'

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const savedUser = localStorage.getItem(userString)
		return savedUser ? JSON.parse(savedUser) : null
	})

	const [accessToken, setAccessToken] = useState<string | null>(() => {
		const savedAccessToken = localStorage.getItem('accessToken')
		return savedAccessToken ? savedAccessToken : null
	})

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
				const user = userCredential.user
				user
					.getIdToken()
					.then(accessToken => {
						setAccessToken(accessToken)
						setUser(user)
						localStorage.setItem('accessToken', accessToken)
						localStorage.setItem(userString, JSON.stringify(user))
						callback()
					})
					.catch(error => {
						console.error(error)
					})
			})
			.catch(error => {
				alert(error)
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
				user
					.getIdToken()
					.then(accessToken => {
						setAccessToken(accessToken)
						updateProfile(user, { displayName: name })
							.then(() => {
								setUser(user)
								localStorage.setItem('accessToken', accessToken)
								localStorage.setItem(userString, JSON.stringify(user))
								callback()
							})
							.catch(error => {
								console.error(error)
							})
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
				localStorage.removeItem('accessToken')
				localStorage.removeItem(userString)
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
				const user = result.user
				user
					.getIdToken()
					.then(accessToken => {
						setAccessToken(accessToken)
						setUser(user)
						localStorage.setItem('accessToken', accessToken)
						localStorage.setItem(userString, JSON.stringify(user))
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

	const value: AuthContextType = {
		user,
		signIn,
		signUp,
		signInWithGoogle,
		signOut
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
