import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'

import AuthContext from './context/AuthContext';
import { getUser } from './services/userApi';

import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/Category';
import Profile from './components/Profile';
import Create from './components/Create';
import Details from './components/Details';
import User from './components/User';

function App() {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [refresh, setRefresh] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetch() {
      const respons = await getUser();
      setProfile(respons);
    }

    fetch();

  }, [refresh]);


  function loginUser() {
    setUser(JSON.parse(sessionStorage.getItem('user')));
  }

  function logutUser() {
    sessionStorage.clear();
    setUser(JSON.parse(sessionStorage.getItem('user')));
  }

  function update() {
    setRefresh(!refresh);
    setUser(JSON.parse(sessionStorage.getItem('user')));
  }



  return (
    <AuthContext.Provider value={{ user, loginUser, logutUser, update, profile, refresh, setRefresh }}>
      <div className="App">
        <Header />
        <Routes>
          <Route exect path='/' element={<Home />} />
          <Route path='/:category' element={<Category />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add-picture' element={<Create />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/user-profile/:id' element={<User />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
