import { Sidebar } from '../Sidebar'
import { Toolbar } from '../Toolbar'
import styles from './layout.module.scss'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
	return (
		<div className={styles.layout}>
			<Toolbar />
			<div className={styles.content}>
				<Sidebar />
				<div className={styles.outlet}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
