import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getPictureById, updatePicture, getPicturesByCategory } from '../services/data';
import { getUserById } from '../services/userApi';
import img from '../assets/img_avatar.png';
import notFound from '../assets/notFound.jpg';
import { AiOutlineLike } from "react-icons/ai";
import Notifications from '../common/Notifications';
import Spinner from '../common/loader/Spinner';
import Pin from '../common/Pin';


function Details() {

  const [details, setDetails] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [useR, setUser] = useState({});
  const [errorM, setErrorM] = useState(null);
  const [update, setUpdate] = useState(true);
  const { id } = useParams();
  const { profile, user } = useContext(AuthContext);

  const isOwner = profile?.objectId === useR?.objectId;

  useEffect(() => {
    async function fetch() {
      const respons = await getPictureById(id);
      setDetails(respons);
    };
    fetch();
  }, [id, update]);

  useEffect(() => {
    async function fetch() {
      if (details?.owner?.objectId) {

        const respons = await getUserById(details?.owner?.objectId);
        setUser(respons);
      }

    };
    fetch();
  }, [details]);

  useEffect(() => {
    async function fetch() {
      if (details?.category) {

        const respons = await getPicturesByCategory(details?.category);
        setCategoryList(respons.results);
      }
    }
    fetch();
  }, [update, details]);

  const list = categoryList.filter((data) => data.objectId !== details.objectId);

  const profPicUrl = profile.imageUrl || '';
  const picUrl = details?.picture?.url;
  const userPicUrl = useR?.imageUrl;

  const likesList = details?.likes;
  const notIncluded = likesList?.some(m => m.userID === profile?.objectId);

  async function addLike() {
    const data = {
      name: profile?.username,
      userID: profile?.objectId
    }

    likesList.push(data);

    try {
      await updatePicture(id, { likes: likesList });
      setUpdate(!update);
    } catch (err) {
      setErrorM(err.message);
    }
  }

  async function addComment(e) {
    e.preventDefault();
    const target = e.target;
    const comment = target.comment.value.trim();
    if (comment) {
      const data = {
        name: profile.username,
        image: profile.imageUrl || img,
        comment
      }

      const newComment = details.comments;
      newComment.push(data);

      try {
        await updatePicture(id, { comments: newComment });
        setUpdate(!update);
      } catch (err) {
        setErrorM(err.message);
      }


    } else {
      setErrorM('Please write a comment.');
    }
  }

  if (!details.objectId && !userPicUrl) {
    return <Spinner message={'Loading ...'} />
  }

  return (
    <div>
      <div className="flex xl:flex-row flex-col m-auto bg-white p-10" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
        {errorM && <Notifications setErrorM={setErrorM} errorM={errorM} />}
        <div className="relative flex justify-center items-center md:items-start flex-initial">
          <img
            style={{ width: '900px', height: '550px' }}
            className="rounded-t-3xl rounded-b-lg object-cover"
            src={picUrl || notFound}
            alt="user-post"
          />
          {(!isOwner && userPicUrl && user) ? <>
            {!notIncluded && <div className="absolute bottom-0 right-0 flex items-center justify-between p-3">
              <div className="flex gap-2 items-center">
                <button onClick={addLike} className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100">
                  <AiOutlineLike />
                </button>
              </div>
            </div>}
          </> : ''}
        </div>

        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {details?.category}
            </h1>
            <p className="mt-3">{details?.description}</p>
            <Link to={`/user-profile/${useR?.objectId}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={userPicUrl || img} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{useR?.username}</p>
            </Link>
          </div>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div style={{ overflow: 'auto', maxHeight: "230px" }}>
            {details?.comments?.map((item) => (
              <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                <img
                  src={item.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{item.name}</p>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
          { user && <form onSubmit={addComment} className="flex flex-wrap mt-6 gap-3">
            <img src={profPicUrl || img} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />

            <input
              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              name='comment'

            />
            <button className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none">Done</button>
          </form>}
        </div>
      </div>
      <div>
        <div className='flex items-center justify-center p-3'>
          <h1 className='font-bold'>More like this</h1>
        </div>
        {list.length ? <div className='flex justify-items-center items-center flex-wrap pt-1 px-14'>
          {list.map((el) => <Pin key={el.objectId} {...el} picId={el.objectId} />)}
        </div> : <h1 className='font-bold ml-10'>No relative pictures found</h1>}
      </div>
    </div>
  );
}

export default Details;