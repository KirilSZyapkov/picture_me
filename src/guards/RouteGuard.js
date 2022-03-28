import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

function RouteGuard() {
    const { user } = useContext(AuthContext);

    return user.userName ? <Outlet /> : <Navigate to={'/login'} />
}

export default RouteGuard;