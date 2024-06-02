import React, { useState } from 'react'
import { Input, CloseButton } from '@mantine/core'
import { IoSearch } from 'react-icons/io5'
import styles from './search.module.scss'

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
		<Input
			type='text'
			className={styles.searchInput}
			leftSection={<IoSearch className={styles.icon} />}
			value={value}
			placeholder='Поиск...'
			onChange={handleChange}
			rightSectionPointerEvents='all'
			rightSection={
				<CloseButton
					aria-label='Clear input'
					onClick={handleClear}
					style={{ display: value ? undefined : 'none' }}
				/>
			}
		/>
	)
}
