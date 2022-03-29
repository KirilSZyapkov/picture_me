import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserOwnPictures, getAllPictures } from '../services/data';
import { getUserById } from '../services/userApi';
import AuthContext from '../context/AuthContext';
import Pin from '../common/Pin';
import Spinner from '../common/loader/Spinner';
import img from '../assets/img_avatar.png';

function User() {

    const [user, setUser] = useState({});
    const [userPictures, setUserPictures] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [selectedPage, setSelectedPage] = useState('User Pictures');
    const [selected, setSelected] = useState(selectedPage);
    const navigation = useNavigate();
    const { profile } = useContext(AuthContext);

    const { id } = useParams();

    if (id === profile.objectId) {
        navigation('/profile');
    }

    useEffect(() => {
        async function fetch() {
            const responsUser = await getUserById(id);
            const responsUserPictures = await getUserOwnPictures(id);
            const responsUserLikes = await getAllPictures();
            setUser(responsUser);
            setUserPictures(responsUserPictures.results);
            setUserLikes(responsUserLikes.results);
        }
        fetch();
    }, [id]);

    const userImg = user?.imageUrl;
    const userBanner = user?.bannerImageUrl;

    const listOfLikes = [];

    userLikes.filter((data) => {
        const list = data.likes;

        const picture = list.some((p) => p.userID === user.objectId);

        if (picture) {

            listOfLikes.push(data);
        }

        return picture;
    });

    let isUserPictures = selected === 'User Pictures' ? 'font-bold bg-red-600 text-white' : '';
    let isUserLikes = selected === 'User Likes' ? 'font-bold bg-red-600 text-white' : '';

    if (!user.objectId && userPictures.length === 0 && userLikes.length === 0) {
        return <Spinner message={"Loading ..."} />
    }

    return (
        <div>
            <div className='relative'>
                <img className='w-full h-250 shadol-lg object-cover' src={userBanner || ''} alt='banner' />
            </div>
            <div className='flex flex-col items-center'>
                <div className='static h-40 overscroll-none'>

                    <img style={{ "minWidth": '190px', "minHeight": '190px', "maxWidth": '190px', "maxHeight": '190px' }} className='rounded-full relative ml-5 -top-20 border-8 border-white object-fill' src={userImg || img} alt='pic' />

                </div>
                <div className='-mt-10'>
                    <p className='text-2xl ml-2'>{user?.username}</p>
                </div>
            </div>
            <div className='flex justify-center items-center mt-10'>
                <button onClick={() => { setSelectedPage('User Pictures'); setSelected('User Pictures') }} className={`ml-3 border-2 rounded-full border-red-600 p-2  w-32 items-center ${isUserPictures}`}>User Pictures</button>
                <button onClick={() => { setSelectedPage('User Likes'); setSelected('User Likes') }} className={`ml-3 border-2 rounded-full border-red-600 p-2  w-32 items-center ${isUserLikes}`}>User Likes</button>
            </div>

            <div className='flex justify-items-center items-center flex-wrap pt-1 px-14'>
                {selectedPage === 'User Pictures' && <>{userPictures.map((pic) => <Pin key={pic.objectId} {...pic} picId={pic.objectId} />)}</>}
                {selectedPage === 'User Likes' && <>{listOfLikes.map((pic) => <Pin key={pic.objectId} {...pic} picId={pic.objectId} />)}</>}
            </div>
        </div>
    )
}

export default User