import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddAPhoto } from 'react-icons/md';
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import Pin from '../common/Pin';
import AuthContext from '../context/AuthContext';
import Notifications from '../common/Notifications';
import img from '../assets/img_avatar.png'
import { getUserOwnPictures } from '../services/data';
import { post } from '../services/uploadImage';
import { updateUser } from '../services/userApi';
import Spinner from '../common/loader/Spinner';

function Profile() {

    const [data, setData] = useState([]);
    const [toggleInput, setToggleInput] = useState(false);
    const [toggleInputBanner, setToggleInputBanner] = useState(false);
    const [errorM, setErrorM] = useState(null);


    const { profile, refresh, setRefresh } = useContext(AuthContext);
    const url = profile.imageUrl;
    const banner = profile.bannerImageUrl;
    const id = profile.objectId;

    useEffect(() => {
        async function fetch() {
            const respons = await getUserOwnPictures(id);
            setData(respons.results);
        }
        fetch();
    }, []);

    async function changePic(e) {
        e.preventDefault();
        const target = e.target;
        const file = target.picture.files[0];
        await uploadPicture(file, 'imageUrl');
    };

    async function changeBanner(e) {
        e.preventDefault();
        const target = e.target;
        const file = target.picture.files[0];
        await uploadPicture(file, 'bannerImageUrl');
    }

    async function uploadPicture(file, target) {
        let respons = '';

        try {
            respons = await post(file, file.name);

        } catch (err) {
            setErrorM(err.message);
        }

        const imgUrl = respons.url;

        try {

            await updateUser(id, { [target]: imgUrl });
            setRefresh(!refresh);
            setToggleInput(false);
            setToggleInputBanner(false);

        } catch (err) {
            setErrorM(err.message);
        }
    }

    if (!profile) {
        return <Spinner message={'Loading ...'} />
    }

    return (
        <div>
            <div className='relative'>
                <img className='w-full h-250 shadol-lg object-cover' src={banner} alt='banner image' />

                <button className='absolute right-5 top-48 border-2 rounded-full p-2 bg-red-600' onClick={() => setToggleInputBanner(!toggleInputBanner)}>{toggleInputBanner ? <AiFillCloseCircle className='text-lg' /> : <BsFillPencilFill className='text-lg' />}</button>
                {toggleInputBanner && <form onSubmit={changeBanner} className='mt-3 absolute right-16 top-42'>
                    <input type='file' name='picture' placeholder='Upload picture' />
                    <button className='bg-red-600 p-1 rounded'>Upload photo</button>
                </form>}

            </div>
            <div className='static h-40'>

                <img style={{ "minWidth": '190px', "minHeight": '190px', "maxWidth": '190px', "maxHeight": '190px' }} className='rounded-full relative ml-5 -top-20 border-8 border-white object-fill' src={url || img} alt='pic' />


                {errorM && <Notifications setErrorM={setErrorM} errorM={errorM} />}
                <div className='relative left-60 -top-44 w-1/2'>
                    <p className='text-2xl ml-2'>{profile.username}</p>
                    <div className='flex items-center text-xs'>
                        <button className='relative -left-24 border-2 rounded-full p-2 bg-red-600' onClick={() => setToggleInput(!toggleInput)}>{toggleInput ? <AiFillCloseCircle className='text-lg' /> : <BsFillPencilFill className='text-lg' />}</button>
                        <p className='ml-3 border-2 rounded-full border-red-600 p-2 flex relative -left-10'> <MdAddAPhoto className='text-sm mr-1' /><Link to='/add-picture'>Add picture</Link></p>
                    </div>
                    {toggleInput && <form onSubmit={changePic} className='mt-3'>
                        <input type='file' name='picture' placeholder='Upload picture' />
                        <button className='bg-red-600 p-1 rounded'>Upload photo</button>
                    </form>}
                </div>
            </div>
            <div className='flex justify-items-center items-center flex-wrap pt-1 px-14'>
                {data.map((pic) => <Pin key={pic.objectId} {...pic} picId={pic.objectId} />)}
            </div>
        </div>
    )
}

export default Profile