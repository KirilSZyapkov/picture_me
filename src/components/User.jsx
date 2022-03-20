import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserOwnPictures, getAllPictures } from '../services/data';
import { getUserById } from '../services/userApi';
import Pin from '../common/Pin';

function User() {

    const [user, setUser] = useState({});
    const [userPictures, setUserPictures] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [selectedPage, setSelectedPage] = useState('User Pictures');
    const [selected, setSelected] = useState(selectedPage);

    const { id } = useParams();

    useEffect(() => {
        async function fetch() {
            const responsUser = await getUserById(id);
            const responsUserPictures = await getUserOwnPictures(id);

            setUser(responsUser);
            setUserPictures(responsUserPictures.results);
        }
        fetch();
    }, [id]);

    console.log(user);
    console.log(userPictures);

    let isUserPictures = selected === 'User Pictures' ? 'font-bold bg-red-600 text-white' : '';
    let isUserLikes = selected === 'User Likes' ? 'font-bold bg-red-600 text-white' : '';

    
    return (
        <div>
            <div className='relative'>
                <img className='w-full h-250 shadol-lg object-cover' src='https://automedia.investor.bg/media/files/resized/article/640x/0f8/b92fba6dc27b52d1a919fe64bee460f8-02-1.jpg' alt='banner' />
            </div>
            <div className='flex flex-col items-center'>
                <div className='static h-40 overscroll-none'>

                    <img style={{ "minWidth": '190px', "minHeight": '190px', "maxWidth": '190px', "maxHeight": '190px' }} className='rounded-full relative ml-5 -top-20 border-8 border-white object-fill' src='https://static.posters.cz/image/750/posters/ferrari-logo-i6660.jpg' alt='pic' />

                </div>
                <div className='-mt-10'>
                    <p className='text-2xl ml-2'>Test</p>
                </div>
            </div>
            <div className='flex justify-center items-center mt-10'>
                <button onClick={() => {setSelectedPage('User Pictures'); setSelected('User Pictures')}} className={`ml-3 border-2 rounded-full border-red-600 p-2  w-32 items-center ${isUserPictures}`}>User pictures</button>
                <button onClick={() => {setSelectedPage('User Likes'); setSelected('User Likes')}} className={`ml-3 border-2 rounded-full border-red-600 p-2  w-32 items-center ${isUserLikes}`}>User Likes</button>
            </div>

            <div className='flex justify-items-center items-center flex-wrap pt-1 px-14'>
                {/* {userPictures.map((pic) => <Pin key={pic.objectId} {...pic} picId={pic.objectId} />)} */}
            </div>
        </div>
    )
}

export default User