import { TextInput } from '@mantine/core'
import { IoSearch } from 'react-icons/io5'
import styles from './search.module.scss'

export const SearchInput = () => {
	return (
		<>
			<TextInput
				className={styles.searchInput}
				leftSection={<IoSearch className={styles.icon} />}
				placeholder='Поиск...'
			></TextInput>
		</>
	)
}
