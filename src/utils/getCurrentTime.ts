export const getCurrentTime = (): string => {
	const currentTime = new Date()
	const hours: string = currentTime.getHours().toString().padStart(2, '0')
	const minutes: string = currentTime.getMinutes().toString().padStart(2, '0')
	return `${hours}:${minutes}`
}
