import React, { useState } from 'react'

import { IoSearch } from 'react-icons/io5'
import styles from './search.module.scss'
import { MdClear } from 'react-icons/md'

export const SearchInput = () => {
	const [value, setValue] = useState<string>('')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value
		setValue(newValue)
	}

	const handleClear = () => {
		setValue('')
	}

	return (
		<div className={styles.wrapper}>
			<input
				type='text'
				className={styles.searchInput}
				value={value}
				placeholder='Поиск...'
				onChange={handleChange}
			/>
			<IoSearch className={styles.icon} />
			{value && <MdClear className={styles.clear} onClick={handleClear} />}
		</div>
	)
}
