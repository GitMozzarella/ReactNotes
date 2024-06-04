import React, { useState } from 'react'
import { Input, Button, CloseButton } from '@mantine/core'
import styles from './signin.module.scss'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { useNavigate } from 'react-router-dom'

interface UserData {
	email: string
	password: string
}

export const SignIn: React.FC = () => {
	const [userData, setUserData] = useState<UserData>({
		email: '',
		password: ''
	})

	const auth = useAuth()
	const navigate = useNavigate()

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		inputField: keyof UserData
	) => {
		setUserData({ ...userData, [inputField]: e.target.value })
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		auth.signIn(userData.email, () => {
			navigate('/')
		})
	}

	return (
		<div className={styles.cover}>
			<div className={styles.signin}>
				<form onSubmit={handleSubmit}>
					<Input.Wrapper
						label='Your e-mail'
						required
						size='md'
						className={styles.labelMargin}
					>
						<Input
							type='email'
							placeholder='JohnDoe@gmail.com'
							value={userData.email}
							onChange={e => handleChange(e, 'email')}
							rightSectionPointerEvents='all'
							rightSection={
								<CloseButton
									aria-label='Clear input'
									onClick={() => setUserData({ ...userData, email: '' })}
									style={{ display: userData.email ? 'block' : 'none' }}
								/>
							}
						/>
					</Input.Wrapper>
					<Input.Wrapper
						label='Your password'
						required
						size='md'
						className={styles.labelMargin}
					>
						<Input
							type='password'
							placeholder='••••••••'
							value={userData.password}
							onChange={e => handleChange(e, 'password')}
							rightSectionPointerEvents='all'
							rightSection={
								<CloseButton
									aria-label='Clear input'
									onClick={() => setUserData({ ...userData, password: '' })}
									style={{ display: userData.password ? 'block' : 'none' }}
								/>
							}
						/>
					</Input.Wrapper>

					<Button size='sm' type='submit'>
						Sign In
					</Button>
				</form>
			</div>
		</div>
	)
}
