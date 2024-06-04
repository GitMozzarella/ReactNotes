import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Content } from '../pages/Content'
import { SignIn } from '../pages/SignIn'
import { Note } from '../pages/Note'
import { MainLayout } from '../components/MainLayout'
import { PrivateRoute } from '../components/PrivateRoute'

export const Router = () => {
	return (
		<Routes>
			<Route path='/auth' element={<SignIn />} />
			<Route element={<PrivateRoute />}>
				<Route element={<MainLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/notes' element={<Content />} />
					<Route path='/notes/:id' element={<Note />} />
				</Route>
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
