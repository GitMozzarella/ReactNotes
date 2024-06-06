import { useToggle } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Divider,
	Anchor,
	Stack
} from '@mantine/core'
import { GoogleButton } from './GoogleButton'
import styles from './index.module.scss'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { useNavigate } from 'react-router-dom'

interface FormValues {
	email: string
	name: string
	password: string
}

export function AuthenticationForm(props: PaperProps) {
	const [type, toggle] = useToggle(['SignIn', 'SignUp'])
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: ''
		},

		validate: {
			name: val =>
				type === 'SignUp' && val.length < 3
					? 'Name must be at least 3 Latin letters long.'
					: null,
			email: val =>
				!/^[\w.-]+@\w+\.\w+$/.test(val) ? 'Invalid email format' : null,
			password: val =>
				val.length < 6 ? 'Password should include at least 6 characters' : null
		}
	})

	const { signIn, signUp } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = (values: FormValues) => {
		if (type === 'SignIn') {
			signIn(values.email, values.password, () => {
				navigate('/')
			})
		} else {
			signUp(values.email, values.password, values.name, () => {
				navigate('/')
			})
		}
	}

	return (
		<div className={styles.formContainer}>
			<div className={styles.formWrapper}>
				<Paper className={styles.form} radius='md' p='xl' withBorder {...props}>
					<Text size='lg' ta={'center'} fw={500}>
						{type === 'SignIn'
							? 'С возвращением!'
							: 'Добро пожаловать! Зарегистрируйтесь, чтобы начать.'}
					</Text>

					<Group grow mb='md' mt='md'>
						<GoogleButton radius='xl'>Google</GoogleButton>
					</Group>

					<Divider
						label='Or continue with email'
						labelPosition='center'
						my='lg'
					/>

					<form onSubmit={form.onSubmit(handleSubmit)}>
						<Stack>
							{type === 'SignUp' && (
								<TextInput
									required
									label='Name'
									placeholder='Michael'
									value={form.values.name}
									onChange={event =>
										form.setFieldValue('name', event.currentTarget.value)
									}
									error={form.errors.name}
									radius='md'
								/>
							)}

							<TextInput
								required
								label='Email'
								placeholder='JohnDoe@gmail.com'
								value={form.values.email}
								onChange={event =>
									form.setFieldValue('email', event.currentTarget.value)
								}
								error={form.errors.email}
								radius='md'
							/>

							<PasswordInput
								required
								label='Password'
								placeholder='••••••••'
								value={form.values.password}
								onChange={event =>
									form.setFieldValue('password', event.currentTarget.value)
								}
								error={form.errors.password}
								radius='md'
							/>
						</Stack>

						<Group justify='space-between' mt='xl'>
							{type === 'SignUp' ? (
								<Text size='xs' c='dimmed'>
									У меня уже есть аккаунт.
									<Anchor
										component='button'
										type='button'
										onClick={() => toggle()}
										size='xs'
									>
										Войти
									</Anchor>
								</Text>
							) : (
								<Text size='xs' c='dimmed'>
									У Вас нет аккаунта?
									<Anchor
										component='button'
										type='button'
										onClick={() => toggle()}
										size='xs'
									>
										Регистрация
									</Anchor>
								</Text>
							)}
							<Button type='submit' radius='xl'>
								{type === 'SignIn' ? 'Войти' : 'Регистрация'}
							</Button>
						</Group>
					</form>
				</Paper>
			</div>
		</div>
	)
}
