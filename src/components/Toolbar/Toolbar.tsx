import { useContext } from 'react'
import { AuthStatus } from '../../context/AuthStatus'
import styles from './toolbar.module.scss'
import { IoMdMoon, IoIosSunny } from 'react-icons/io'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'

export const Toolbar = () => {
	const { darkMode, toggleDarkMode } = useContext(NotesContext)

	return (
		<div className={`${styles.toolbar} ${darkMode ? styles.darkMode : ''}`}>
			<AuthStatus />
			<div className={styles.toggle} onClick={toggleDarkMode}>
				{darkMode ? <IoIosSunny /> : <IoMdMoon />}
			</div>
		</div>
	)
}
