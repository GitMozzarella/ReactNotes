import { NotesContext } from '../../context/NotesProvider/NotesProvider'
import styles from './workspace.module.scss'
import { useContext } from 'react'

export const Workspace = () => {
	const { darkMode } = useContext(NotesContext)

	return (
		<div className={`${darkMode ? styles.darkMode : styles.workspace}`}>
			<p className={styles.chooseNote}>
				Выберите заметку для просмотра и редактирования
			</p>
		</div>
	)
}
