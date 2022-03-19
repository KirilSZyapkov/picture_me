import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import { getUserById } from '../services/userApi';
import img from '../assets/img_avatar.png';
// import Loading from './loader/Loading';

function Pin({
    likes,
    picId,    
    picture,
    owner
}) {

    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetch() {
            const respons = await getUserById(owner?.objectId);
            setUser(respons);
        }

        fetch();
    }, []);

    const userUrl = user?.imageUrl || ''

    const url = picture.url;

    return (
        <div style={{width: '300px', height: '250px'}} className='shadow-md max-w-xs text-center m-3 overflow-hidden bg-slate-200'>
            {(userUrl && url) && <Link to={`/details/${picId}`}>
                <div>
                    <img className='w-full overflow-hidden' src={url} alt="image" />
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center'>
                            <img className='w-8 h-8 rounded-full ml-3' src={userUrl || img} alt="avatar"></img>
                            <p className='ml-1'>{user?.username}</p>
                        </div>
                        <p className='flex justify-end items-center m-2'>{likes?.length}<FcLike className='ml-1' /></p>
                    </div>
                </div>
            </Link>}
        </div>
    );
}

export default Pin;

