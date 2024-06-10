import { useAuth } from '../AuthProvider/useAuth'
import { useNavigate } from 'react-router-dom'
import styles from './status.module.scss'
import { MdLogout } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'

export function AuthStatus() {
	const auth = useAuth()
	const navigate = useNavigate()

	const handleSignOut = () => {
		auth.signOut(() => {
			navigate('/auth')
		})
	}

	return (
		<>
			<div className={styles.message}>
				<span className={styles.logoutButton}>
					<FaUserAlt />
				</span>

				<p className={styles.username}>
					{auth.user?.displayName || auth.user?.email}
				</p>
				<button onClick={handleSignOut} className={styles.logoutButton}>
					<MdLogout />
				</button>
			</div>
		</>
	)
}
