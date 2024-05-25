import { useContext } from 'react'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { Sidebar } from '../Sidebar'
import { Toolbar } from '../Toolbar'
import styles from './layout.module.scss'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
	const { darkMode } = useContext(NotesContext)
	return (
		<div className={styles.layout}>
			<Toolbar />
			<div className={styles.content}>
				<Sidebar />
				<div className={`${styles.outlet} ${darkMode ? styles.darkMode : ''}`}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
