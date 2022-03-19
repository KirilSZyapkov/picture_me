import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import pictureVideo from '../assets/share.mp4';
import Notifications from '../common/Notifications';
import { register } from '../services/data';
import AuthContext from '../context/AuthContext';


function Register() {

  const [errorM, setErrorM] = useState(null);
  const navigation = useNavigate();

  const { update } = useContext(AuthContext);

  async function responseGoogle(respons) {

    if (respons.error) {

      setErrorM(respons.error);

    } else {

      const { name, email, imageUrl, googleId } = await respons.profileObj;

      const data = {
        username: name,
        email,
        password: googleId,
        imageUrl
      };

      await createAccount(data);
      navigation('/');
      update();
    }
  };

  async function createNewAcc(e) {
    e.preventDefault();
    const target = e.target;

    if (target.password.value.trim() !== target.rePass.value.trim()) {
      setErrorM('Passwords don\'t match!');
    } else if (target.password.value.trim().length < 5) {
      setErrorM('Password must be 5 charecter long!');
    } else {

      const data = {
        username: target.username.value.trim(),
        email: target.email.value.trim(),
        password: target.password.value.trim(),
      };

      await createAccount(data);
      navigation('/');
      update();
    }


  };

  async function createAccount(body) {
    try {
      await register(body)

    } catch (err) {
      
      setErrorM(err.message);
    }
  }


  return (
    <div className='flex justify-start item-center flex-col h-screen'>
      {errorM && <Notifications setErrorM={setErrorM} errorM={errorM} />}
      <div className='relative w-full h-full'>
        <video
          src={pictureVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className="relative rounded-sm bg-gray-100 p-7 opacity-70">
            <form onSubmit={createNewAcc}>
              <h2 className='text-center mb-7 font-bold'>Sign up with Social Media or Manually</h2>
              <div className="flex flex-col items-center justify-between">
                <GoogleLogin
                  clientId='355724897092-l265jpakksa7mv9n5ku3gapjvi1nr1tg.apps.googleusercontent.com'
                  render={(renderProps) => (
                    <button
                      type='button'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="w-full p-3 border-none rounded my-1 opacity-80 inline-block text-lg leading-5 flex items-center bg-red-600 text-white">
                      <FcGoogle className="mr-3 text-white" /> Sign up with Google+
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                />

                <div className="my-3 font-bold">
                  <span>or</span>
                </div>

                <div className="col">
                  <input className="my-2 w-full p-3 border-none rounded my-1 opacity-80 inline-block text-lg leading-5 flex items-center text-black" type="text" name="username" placeholder="Username" required />
                  <input className="my-2 w-full p-3 border-none rounded my-1 opacity-80 inline-block text-lg leading-5 flex items-center text-black" type="text" name="email" placeholder="E-mail" required />
                  <input className="my-2 w-full p-3 border-none rounded my-1 opacity-80 inline-block text-lg leading-5 flex items-center text-black" type="password" name="password" placeholder="Password" required />
                  <input className="my-2 w-full p-3 border-none rounded my-1 opacity-80 inline-block text-lg leading-5 flex items-center text-black" type="password" name="rePass" placeholder="Repeat password" required />
                  <input className="my-2 w-full p-3 border-none rounded my-1 opacity-80 inline-block text-lg leading-5 flex items-center justify-center bg-red-700 text-white cursor-pointer" type="submit" value="Create" />
                </div>

              </div>
            </form>
            <p className='text-center mt-2'>All ready have an account? <Link to="/login"><span className='text-red-700'>Login</span></Link></p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register