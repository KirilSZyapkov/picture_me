import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

function UserGuard() {
    const { profile } = useContext(AuthContext);

    return profile.username ? <Navigate to={'/'} /> : <Outlet />
}

export default UserGuard;