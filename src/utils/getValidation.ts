import { authForm, AuthTypes } from '../constants/variables'

export const getValidation = (type: AuthTypes) => ({
	name: (val: string) =>
		type === AuthTypes.signin && val.length < 3 ? authForm.least3letters : null,
	email: (val: string) =>
		!/^[\w.-]+@\w+\.\w+$/.test(val) ? authForm.invalidEmail : null,
	password: (val: string) => (val.length < 6 ? authForm.invalidPassword : null)
})
