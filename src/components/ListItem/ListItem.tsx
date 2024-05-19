import styles from './listitem.module.scss'
import { MdDelete, MdModeEdit } from 'react-icons/md'

export const ListItem = () => {
	return (
		<>
			<ul className={styles.list}>
				<li className={styles.note}>
					<p className={styles.headerNote}>Продукты</p>
					<div className={styles.noteInfo}>
						<p className={styles.timeNote}>20:17</p>
						<p className={styles.textNote}>Additional text</p>
					</div>
					<div className={styles.buttons}>
						<button className={styles.editButton}>
							<MdModeEdit />
						</button>
						<button className={styles.deleteButton}>
							<MdDelete />
						</button>
					</div>
				</li>
				<li className={styles.note}>
					<p className={styles.headerNote}>Header</p>
					<div className={styles.noteInfo}>
						<p className={styles.timeNote}>05.08.2023</p>
						<p className={styles.textNote}>Additional</p>
					</div>
					<div className={styles.buttons}>
						<button className={styles.editButton}>
							<MdModeEdit />
						</button>
						<button className={styles.deleteButton}>
							<MdDelete />
						</button>
					</div>
				</li>
			</ul>
		</>
	)
}
