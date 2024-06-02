import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { NotesProvider } from './context/NotesProvider/NotesProvider.tsx'
import { ModalsProvider } from '@mantine/modals'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<MantineProvider>
				<NotesProvider>
					<ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
						<App />
					</ModalsProvider>
				</NotesProvider>
			</MantineProvider>
		</BrowserRouter>
	</React.StrictMode>
)
