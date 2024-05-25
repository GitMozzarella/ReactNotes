import { useState } from 'react'

export const useToggle = (defaultValue: boolean) => {
	const [value, setValue] = useState(defaultValue)

	function toggleValue() {
		setValue(prevState => !prevState)
	}

	return [value, toggleValue] as const
}
