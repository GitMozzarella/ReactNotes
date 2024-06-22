import { Container, Title, Text, Button, Group } from '@mantine/core'
import { Illustration } from './Illustration'
import styles from './nothingFound.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { messages } from '../../constants/messages'
import { Path } from '../../router/Path'

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
			navigate(Path.home)
		}
	}, [timer, navigate])

	return (
		<Container fluid className={styles.root}>
			<div className={styles.inner}>
				<Illustration className={styles.image} />
				<div className={styles.content}>
					<Title className={styles.title}>{messages.notFound}</Title>
					<Text className={styles.description}>{messages.description}</Text>
					<Group justify='center'>
						<Button size='md' onClick={() => navigate('/')}>
							{messages.redirectToHome}
						</Button>
					</Group>
					<Text className={styles.timerMessage}>
						{messages.timerMessage}
						<span className={styles.timer}>{timer}</span>
						{messages.seconds}
					</Text>
				</div>
			</div>
		</Container>
	)
}
