// import { useAuth } from '../AuthProvider/AuthProvider'
// import { useNavigate } from 'react-router-dom'
import styles from './status.module.scss'
import { MdLogout } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'

export function AuthStatus() {
	// const auth = useAuth()
	// const navigate = useNavigate()

	// const handleSignOut = () => {
	// 	auth.signOut(() => {
	// 		navigate('/')
	// 	})
	// }

	// if (auth.user === null || auth.user === undefined) {
	// 	return <div className={styles.noLogged}>You are not logged in</div>
	// }

	return (
		<>
			<div className={styles.message}>
				<span className={styles.logoutButton}>
					<FaUserAlt />
				</span>

				<p className={styles.username}>Ssdsf</p>
				<button className={styles.logoutButton}>
					<MdLogout />
				</button>
			</div>
		</>
	)
}
