import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { AuthContextType } from '../../types/types'
import { ErrorMessages } from '../../constants/errorMessages'

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error(ErrorMessages.useAuthNotUsed)
	}
	return context
}
