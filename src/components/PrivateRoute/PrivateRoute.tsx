import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { Loading } from '../Loading'
import { Path } from '../../router/Path'

interface PrivateRouteProps {
	children?: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
	const auth = useAuth()
	const location = useLocation()

	if (auth === undefined) {
		return (
			<>
				<Loading />
			</>
		)
	}

	if (auth.user === null) {
		return (
			<Navigate to={Path.auth} state={{ from: location.pathname }} replace />
		)
	}

	return children ? <>{children}</> : <Outlet />
}
