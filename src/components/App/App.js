import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { convertSavedMovie } from '../../utils/Utils';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [loggedIn, setLoggedIn] = useState(true);
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies') || '[]'));
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies') || '[]'));
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isShowPreloader, setIsShowPreloader] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const navigate = useNavigate();
  const [isMoviesApiError, setIsMoviesApiError] = useState(false);

  function checkToken() {
    const token = localStorage.getItem('jwt');
    mainApi.addToken(token);
    if (token) {
      mainApi.getUserInfo()
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
            navigate('/');
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  function handleRegister(name, email, password) {
    return mainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch(err => (err.message));
  }

  function handleLogin(email, password) {
    return mainApi.authorize(email, password)
      .then((data) => {
        if (!data.token) throw new Error('Missing jwt');
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => (err.message));
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser({
      name: '',
      email: ''
    })
    setLoggedIn(false);
    setAllMovies([]);
    setSavedMovies([]);
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    navigate('/');
  }

  function handleUpdateUserInfo(name, email) {
    mainApi.updateUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(err => (err.message))
  }

  function calcCardsCounter() {
    const counter = { render: 16, more: 4 };

    if (window.innerWidth < 1280) {
      counter.render = 12;
      counter.more = 3;
    }

    if (window.innerWidth < 1000) {
      counter.render = 8;
      counter.more = 2;
    }
    if (window.innerWidth < 400) {
      counter.render = 5;
      counter.more = 1;
    }

    return counter;
  }

  const counter = calcCardsCounter();
  const [cardsCounter, setCardsCounter] = useState(counter.render);

  function loadSavedCards() {
    const counter = calcCardsCounter();
    setCardsCounter(cardsCounter + counter.more);
  }

  function filter(name, isShorts, allMovies) {
    return allMovies.filter((movie) => {
      const isName = movie.nameRU.toLowerCase().includes(name.toLowerCase());
      const isMoviesShorts = isShorts ? movie.duration <= 40 : true;
      return isName && isMoviesShorts;
    });
  }

  function handleSearchFilm(name, isShorts) {
    localStorage.setItem('search-name', name);
    localStorage.setItem('search-isShorts', JSON.stringify(isShorts));

    if (allMovies.length === 0) {
      setIsShowPreloader(true);

      moviesApi.getMovies()
        .then((res) => {
          localStorage.setItem('allMovies', JSON.stringify(res));
          setAllMovies(res);
          setFilteredMovies(filter(name, isShorts, res));
          setIsMoviesApiError(false);
        })
        .catch((err) => {
          console.log(err)
          setIsMoviesApiError(true);
        })
        .finally(() => {
          setIsShowPreloader(false);
        });
    } else {
      setFilteredMovies(filter(name, isShorts, allMovies));
    }
  }

  function handleSearchSavedFilm(name, isShorts) {
    localStorage.setItem('search-saved-name', name);
    localStorage.setItem('search-saved-isShorts', JSON.stringify(isShorts));

    if (savedMovies.length === 0) {
      setIsShowPreloader(true);

      mainApi.getMovies()
        .then((res) => {
          localStorage.setItem('savedMovies', JSON.stringify(res));
          setSavedMovies(res);
          setFilteredSavedMovies(filter(name, isShorts, res));
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsShowPreloader(false);
        });
    } else {
      setFilteredSavedMovies(filter(name, isShorts, savedMovies));
    }
  }

  function getIdsSavedMovies() {
    let arrIds = [];
    savedMovies.forEach((movie) => {
        arrIds.push(movie.movieId || movie.id);
    });
    setSavedIds(arrIds);
  }

  useEffect(() => {
    getIdsSavedMovies();
  }, [savedMovies]);

  function handleCardLike(card) {
    const cardId = card.id || card.movieId;
    if (savedIds.includes(cardId)) {
      let delCardId = 0;
      if (card._Id) {
        delCardId = card.Id;
      } else {
        delCardId = savedMovies.find(movie => movie.movieId === cardId)._id;
      }
      mainApi.deleteMovie(delCardId).then(() => {
        setSavedMovies((prev) => {
          const filtered = prev.filter(({ movieId }) => movieId !== cardId);
          localStorage.setItem('savedMovies', JSON.stringify(filtered));
          return filtered;
        });
        setFilteredSavedMovies((prev) => prev.filter(({ movieId }) => movieId !== cardId));
      });
    } else {
      mainApi.saveMovie(card).then((res) => {
        setSavedMovies((prev) => {
          const newSavedMovies = [...prev, { ...convertSavedMovie(card), _id: res._id }];
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
          return newSavedMovies;
        });
      });
    }
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
              <Profile onUpdateUser={handleUpdateUserInfo} onLogout={handleLogout} />
            </ProtectedRoute>}
          />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                onSearchFilm={handleSearchFilm}
                allMovies={filteredMovies.filter((сurrentArray, index) => index < cardsCounter)}
                loadCards={loadSavedCards}
                hasCards={filteredMovies.length > cardsCounter}
                isShowPreloader={isShowPreloader}
                savedIds={savedIds}
                onCardLike={handleCardLike}
                isMoviesApiError={isMoviesApiError}
              />
            </ProtectedRoute>}
          />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                onSearchSavedFilm={handleSearchSavedFilm}
                allMovies={filteredSavedMovies}
                savedMovies={savedMovies}
                isShowPreloader={isShowPreloader}
                savedIds={savedIds}
                onCardLike={handleCardLike}
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
