import { FormValues } from '../types/types'

export const addButton: string = 'Добавить заметку'
export const emptyArrayNotes: string = 'Нет заметок'
export const newNote: string = 'Новая заметка'
export const additionalText: string = 'Текст заметки...'
export const userString: string = 'user'

export enum AuthTypes {
	signin = 'SignIn',
	signup = 'Signup'
}

export const authVariables = {
	WelcomeBack: 'С возвращением!',
	Welcome: 'Добро пожаловать! Зарегистрируйтесь, чтобы начать.',
	UserHaventAccount: '	У Вас нет аккаунта?',
	HaveAccount: 'У меня уже есть аккаунт.'
}
export const SignIn: string = 'Войти'
export const SignUp: string = 'Регистрация'
export const Google: string = 'Google'

export const authForm = {
	least3letters: 'Name must be at least 3 Latin letters long.',
	invalidEmail: 'Invalid email format',
	invalidPassword: 'Password should include at least 6 characters'
}

export const labels = {
	withEmail: 'Or continue with email',
	Name: 'Name',
	name: 'name',
	Email: 'E-mail',
	email: 'email',
	Password: 'Password',
	password: 'password'
}

export const initialValues: FormValues = {
	email: '',
	name: '',
	password: ''
}
