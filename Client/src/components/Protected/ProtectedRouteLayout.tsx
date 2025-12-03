import ProtectedRoute from './ProtectedRoute'
import { Outlet } from 'react-router-dom'

const ProtectedRouteLayout = () => {
    return (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
}

export default ProtectedRouteLayout
