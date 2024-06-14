import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Workspace } from '../pages/Workspace'
import { Note } from '../pages/Note'
import { MainLayout } from '../components/MainLayout'
import { PrivateRoute } from '../components/PrivateRoute'
import { AuthenticationForm } from '../pages/AuthenticationForm/AuthenticationForm'
import { Path } from './Path'
export const Router = () => {
	return (
		<Routes>
			<Route path={Path.auth} element={<AuthenticationForm />} />
			<Route element={<PrivateRoute />}>
				<Route element={<MainLayout />}>
					<Route path={Path.home} element={<Home />} />
					<Route path={Path.notes} element={<Workspace />} />
					<Route path={Path.note} element={<Note />} />
				</Route>
			</Route>
			<Route path={Path.notfound} element={<NotFound />} />
		</Routes>
	)
}
