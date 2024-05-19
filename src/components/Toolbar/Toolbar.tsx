import { AuthStatus } from '../../context/AuthStatus'
import styles from './toolbar.module.scss'

export const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<AuthStatus />
		</div>
	)
}
