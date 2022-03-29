import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/img_avatar.png';
import logo from '../assets/logo.png';
import AuthContext from '../context/AuthContext';
import { logout } from '../services/data';

import animals from '../assets/animals.jpg';
import art from '../assets/art.jpg';
import cars from '../assets/cars.jpg';
import fitnes from '../assets/fitnes.jpg';
import food from '../assets/food.jpg';
import nature from '../assets/nature.jpg';
import photos from '../assets/photos.jpg';
import travel from '../assets/travel.jpeg';
import wallpapers from '../assets/wallpapers.jpg';
import websites from '../assets/websites.jpg';

function Header() {

  const [toggle, setToggle] = useState(false);
  const navigation = useNavigate();
  const { user, profile, logutUser } = useContext(AuthContext);
  const url = profile.imageUrl || '';

  return (
    <header>
      <div className='flex justify-between bg-slate-100 items-center p-1'>
        <div className='flex items-center'>
          <img className='w-8 h-8 ml-5 logo' src={logo} alt="Avatar"></img>
          <Link to='/'><p className='font-bold logo-text'>Picture Me</p></Link>
        </div>

        <div className='flex items-center mr-10'>
          {user && <Link to='/profile' className='flex items-center mr-10'>
            <p>{user?.userName}</p>
            <img className='w-8 h-8 rounded-full ml-3' src={url || img} alt="avatar"></img>
          </Link>}
          {!user && <Link to='/register' className='text-red-700'>Sign Up</Link>}
          {user && <button className='text-red-700' onClick={() => { logout(); logutUser(); navigation('/'); }}>Logout</button>}
          <i onClick={() => setToggle(!toggle)} className="fa fa-bars ml-5 cursor-pointer"></i>
        </div>
      </div>
      {toggle && <div className='flex flex-wrap justify-evenly py-3 bg-slate-100'>
        <Link to="/animals" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={animals} alt="logo" /> <p>Animals</p></Link>
        <Link to="/art" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={art} alt="logo" /> <p>Art</p></Link>
        <Link to="/cars" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={cars} alt="logo" /> <p>Cars</p></Link>
        <Link to="/fitnes" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={fitnes} alt="logo" /> <p>Fitnes</p></Link>
        <Link to="/food" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={food} alt="logo" /> <p>Food</p></Link>
        <Link to="/nature" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={nature} alt="logo" /> <p>Nature</p></Link>
        <Link to="/photos" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={photos} alt="logo" /> <p>Photos</p></Link>
        <Link to="/travel" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={travel} alt="logo" /> <p>Travel</p></Link>
        <Link to="/wallpapers" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={wallpapers} alt="logo" /> <p>Wallpapers</p></Link>
        <Link to="/websites" className='flex flex-col items-center'><img className='w-9 h-9 rounded-full mx-1' src={websites} alt="logo" /> <p>Websites</p></Link>
      </div>}
    </header>
  )
}

export default Header