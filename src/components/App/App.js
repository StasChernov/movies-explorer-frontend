import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {cards, savedCards} from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Виталий',
    email: 'vitalka@mail.ru'
  });
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isShowPreloader, setIsShowPreloader] = useState(false);

  const navigate = useNavigate();
  function handleRegister() {
    setLoggedIn(true);
    navigate('/movies');
  }

  function handleLogin() {
    setLoggedIn(true);
    navigate('/movies');
  }

  function handleLogout() {
    setCurrentUser({
      name: '',
      email: ''
    })
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={currentUser.email} />
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/signup' element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Register onRegister={handleRegister} />
            </ProtectedRoute>}
          />
          <Route path='/signin' element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Login onLogin={handleLogin} />
            </ProtectedRoute>}
          />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile onLogout={handleLogout} />
            </ProtectedRoute>}
          />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                cards={cards}
                isShowPreloader={isShowPreloader}
              />
            </ProtectedRoute>}
          />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                cards={savedCards}
                isShowPreloader={isShowPreloader}
              />
            </ProtectedRoute>}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;
