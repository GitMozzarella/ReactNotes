import './App.scss'
import { AuthProvider } from './context/AuthProvider'
import { Router } from './router/Router'

export const App = () => {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	)
}
