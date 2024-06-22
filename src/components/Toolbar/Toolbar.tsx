import { useContext } from 'react'
import { AuthStatus } from '../../context/AuthStatus'
import styles from './toolbar.module.scss'
import { IoMdMoon, IoIosSunny, IoIosHome } from 'react-icons/io'
import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../router/Path'

export const Toolbar = () => {
	const navigate = useNavigate()
	const { darkMode, toggleDarkMode } = useContext(NotesContext)

	const redirectToHome = () => {
		navigate(Path.home)
	}

	return (
		<div className={`${styles.toolbar} ${darkMode ? styles.darkMode : ''}`}>
			<AuthStatus />
			<div className={styles.icons}>
				<div className={styles.toggle} onClick={redirectToHome}>
					<IoIosHome />
				</div>
				<div className={styles.toggle} onClick={toggleDarkMode}>
					{darkMode ? <IoIosSunny /> : <IoMdMoon />}
				</div>
			</div>
		</div>
	)
}
