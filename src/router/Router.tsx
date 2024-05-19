import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Content } from '../pages/Content'
import { Login } from '../pages/Login'
import { MainLayout } from '../components/MainLayout'

export const Router = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/notes/:id' element={<Content />} />
			</Route>
			<Route path='*' element={<NotFound />} />
			<Route path='/auth' element={<Login />} />
		</Routes>
	)
}
