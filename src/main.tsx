import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { NotesProvider } from './context/NotesProvider/NotesProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<MantineProvider>
				<NotesProvider>
					<App />
				</NotesProvider>
			</MantineProvider>
		</BrowserRouter>
	</React.StrictMode>
)
