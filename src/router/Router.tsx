import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Content } from '../pages/Content'
import { SignIn } from '../pages/SignIn'
import { MainLayout } from '../components/MainLayout'

export const Router = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/notes' element={<Content />} />
			</Route>
			<Route path='*' element={<NotFound />} />
			<Route path='/auth' element={<SignIn />} />
		</Routes>
	)
}
