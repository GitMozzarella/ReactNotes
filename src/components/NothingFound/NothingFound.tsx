import { Container, Title, Text, Button, Group } from '@mantine/core'
import { Illustration } from './Illustration'
import styles from './nothingFound.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const NothingFound = () => {
	const navigate = useNavigate()
	const [timer, setTimer] = useState(9)

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer(prevTimer => prevTimer - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (timer === 0) {
			navigate('/')
		}
	}, [timer, navigate])

	return (
		<Container fluid className={styles.root}>
			<div className={styles.inner}>
				<Illustration className={styles.image} />
				<div className={styles.content}>
					<Title className={styles.title}>Ничего не найдено</Title>
					<Text className={styles.description}>
						К сожалению, страница не найдена. Возможно, вы ввели неправильный
						адрес или страница была перемещена. Попробуйте проверить URL еще раз
						или вернуться на предыдущую страницу.
					</Text>
					<Group justify='center'>
						<Button size='md' onClick={() => navigate('/')}>
							Перейти на главную страницу
						</Button>
					</Group>
					<Text className={styles.timerMessage}>
						Вы будете перенаправлены на главную страницу через{' '}
						<span className={styles.timer}>{timer}</span> секунд
					</Text>
				</div>
			</div>
		</Container>
	)
}
