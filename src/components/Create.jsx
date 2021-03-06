import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pVideo from '../assets/share.mp4'
import { addPicture } from '../services/data';
import AuthContext from '../context/AuthContext';
import { post } from '../services/uploadImage';
import Notifications from '../common/Notifications';

function Create() {

  const [errorM, setErrorM] = useState(null);
  const { profile } = useContext(AuthContext);
  const id = profile.objectId;
  const navigation = useNavigate();


  async function uploadPicture(e) {
    e.preventDefault();
    const target = e.target;
    const file = target.picture.files[0];
    const category = target.category.value;
    const description = target.description.value.trim();

    try {

      const response = await post(file, file.name)
      const picture = Object.assign({ __type: "File" }, response);

      const data = {
        picture,
        category,
        description
      }

      await addPicture(data, id);
      navigation('/');

    } catch (err) {

      setErrorM(err.message);
    }
  }


  return (
    <div className='absolute flex justify-start item-center flex-col h-screen'>
      <video
        src={pVideo}
        type='pVideo/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
      />
      <div className='p-2 absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>

        <div className="relative rounded-sm bg-gray-100 p-5 opacity-70">
          {errorM && <Notifications setErrorM={setErrorM} errorM={errorM} />}

          <form onSubmit={uploadPicture}>
            <label htmlFor="picture">Upload picture</label>
            <input className='w-full p-3 border border-solid border-gray-300 rounded mt-1.5 mb-4' type="file" name="picture" required />

            <label htmlFor="category">Category</label>
            <select className='w-full p-3 border border-solid border-gray-300 rounded mt-1.5 mb-4' name="category" required>
              <option value="animals">animals</option>
              <option value="art">art</option>
              <option value="cars">cars</option>
              <option value="fitnes">fitnes</option>
              <option value="food">food</option>
              <option value="nature">nature</option>
              <option value="photos">photos</option>
              <option value="travel">travel</option>
              <option value="wallpapers">wallpapers</option>
              <option value="websites">websites</option>
            </select>

            <textarea className='w-full p-3 border border-solid border-gray-300 rounded mt-1.5 mb-4' name="description" placeholder="Write something.." required></textarea>
            <div className='flex justify-end'>
              <input className='bg-red-600 text-white px-5 py-3 border-none rounded cursor-pointer' type="submit" value="Submit" />
            </div>
          </form>

        </div>
      </div>
    </div>

  );
}

export default Create;