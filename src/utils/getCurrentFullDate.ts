export interface IDateTime {
	day: string
	month: Month
	year: number
	hours: string
	minutes: string
}

export enum Month {
	January = 'January',
	February = 'February',
	March = 'March',
	April = 'April',
	May = 'May',
	June = 'June',
	July = 'July',
	August = 'August',
	September = 'September',
	October = 'October',
	November = 'November',
	December = 'December'
}

export const getCurrentDateTime = (): IDateTime => {
	const months: string[] = [
		Month.January,
		Month.February,
		Month.March,
		Month.April,
		Month.May,
		Month.June,
		Month.July,
		Month.August,
		Month.September,
		Month.October,
		Month.November,
		Month.December
	]

	const currentTime: Date = new Date()
	const day: string = currentTime.getDate().toString().padStart(2, '0')
	const month: Month = months[currentTime.getMonth()] as Month
	const year: number = currentTime.getFullYear()
	const hours: string = currentTime.getHours().toString().padStart(2, '0')
	const minutes: string = currentTime.getMinutes().toString().padStart(2, '0')

	return {
		day,
		month,
		year,
		hours,
		minutes
	}
}

export const getCurrentFullDate = (): string => {
	const dateTime: IDateTime = getCurrentDateTime()
	const { day, month, year, hours, minutes } = dateTime

	const monthString: string = Month[month]

	return `${day} ${monthString} ${year}, ${hours}:${minutes}`
}
