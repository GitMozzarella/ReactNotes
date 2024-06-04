import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider/useAuth'

interface PrivateRouteProps {
	children?: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
	const auth = useAuth()
	const location = useLocation()

	if (auth === undefined || auth.user === null) {
		return <Navigate to='/auth' state={{ from: location.pathname }} replace />
	}

	return children ? <>{children}</> : <Outlet />
}
