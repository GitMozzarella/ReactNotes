import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Workspace } from '../pages/Workspace'
import { Note } from '../pages/Note'
import { MainLayout } from '../components/MainLayout'
import { PrivateRoute } from '../components/PrivateRoute'
import { AuthenticationForm } from '../pages/AuthenticationForm/AuthenticationForm'

export const Router = () => {
	return (
		<Routes>
			<Route path='/auth' element={<AuthenticationForm />} />
			<Route element={<PrivateRoute />}>
				<Route element={<MainLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/notes' element={<Workspace />} />
					<Route path='/notes/:id' element={<Note />} />
				</Route>
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
