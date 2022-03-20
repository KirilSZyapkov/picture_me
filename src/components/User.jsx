import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserOwnPictures } from '../services/data';
import { getUserById } from '../services/userApi';

function User() {

    const [user, setUser] = useState({});
    return (
        <div>User</div>
    )
}

export default User