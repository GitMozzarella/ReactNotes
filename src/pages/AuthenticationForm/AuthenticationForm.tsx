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
import { FormValues } from '../../types/types'
import {
	AuthTypes,
	SignIn,
	SignUp,
	authVariables,
	Google,
	labels,
	initialValues
} from '../../constants/variables'
import { Path } from '../../router/Path'
import { getValidation } from '../../utils/getValidation'

export function AuthenticationForm(props: PaperProps) {
	const [type, toggle] = useToggle([AuthTypes.signin, AuthTypes.signup])
	const form = useForm({
		initialValues: initialValues,

		validate: getValidation(type)
	})

	const { signIn, signUp } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = (values: FormValues) => {
		if (type === AuthTypes.signin) {
			signIn(
				values.email,
				values.password,
				() => {
					navigate(Path.home)
				},
				() => {
					alert('123')
				}
			)
		} else {
			signUp(values.email, values.password, values.name, () => {
				navigate(Path.home)
			})
		}
	}

	return (
		<div className={styles.formContainer}>
			<div className={styles.formWrapper}>
				<Paper className={styles.form} radius='md' p='xl' withBorder {...props}>
					<Text size='lg' ta={'center'} fw={500}>
						{type === AuthTypes.signin
							? authVariables.WelcomeBack
							: authVariables.Welcome}
					</Text>

					<Group grow mb='md' mt='md'>
						<GoogleButton radius='xl'>{Google}</GoogleButton>
					</Group>

					<Divider label={labels.withEmail} labelPosition='center' my='lg' />

					<form onSubmit={form.onSubmit(handleSubmit)}>
						<Stack>
							{type === AuthTypes.signup && (
								<TextInput
									required
									label={labels.Name}
									placeholder='Michael'
									value={form.values.name}
									onChange={event =>
										form.setFieldValue(labels.name, event.currentTarget.value)
									}
									error={form.errors.name}
									radius='md'
								/>
							)}

							<TextInput
								required
								label={labels.Email}
								placeholder='JohnDoe@gmail.com'
								value={form.values.email}
								onChange={event =>
									form.setFieldValue(labels.email, event.currentTarget.value)
								}
								error={form.errors.email}
								radius='md'
							/>

							<PasswordInput
								required
								label={labels.Password}
								placeholder='••••••••'
								value={form.values.password}
								onChange={event =>
									form.setFieldValue(labels.password, event.currentTarget.value)
								}
								error={form.errors.password}
								radius='md'
							/>
						</Stack>

						<Group justify='space-between' mt='xl'>
							{type === AuthTypes.signup ? (
								<Text size='xs' c='dimmed'>
									{authVariables.HaveAccount}
									<Anchor
										component='button'
										type='button'
										onClick={() => toggle()}
										size='xs'
									>
										{SignIn}
									</Anchor>
								</Text>
							) : (
								<Text size='xs' c='dimmed'>
									{authVariables.UserHaventAccount}
									<Anchor
										component='button'
										type='button'
										onClick={() => toggle()}
										size='xs'
									>
										{SignUp}
									</Anchor>
								</Text>
							)}
							<Button type='submit' radius='xl'>
								{type === AuthTypes.signin ? SignIn : SignUp}
							</Button>
						</Group>
					</form>
				</Paper>
			</div>
		</div>
	)
}
