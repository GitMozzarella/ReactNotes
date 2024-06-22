import { NothingFound } from '../../components/NothingFound'
import styles from './notfound.module.scss'
export const NotFound = () => {
	return (
		<div className={styles.body}>
			<NothingFound />
		</div>
	)
}
