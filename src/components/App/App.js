import './App.css';
import Header from '../Header/Header.js'
import Main from '../Main/Main.js'
import Footer from '../Footer/Footer.js'
import Movies from '../Movies/Movies.js'
import SavedMovies from '../SavedMovies/SavedMovies.js'
import Profile from '../Profile/Profile.js'
import Register from '../Register/Register.js'
import Login from '../Login/Login.js'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { Route, Switch, useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function App() {


  const [localMovies, setLocalMovies] = useState([]);
  const [localSavedMovies, setLocalSavedMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isErrorMovie, setIsErrorMovie] = useState(false);
  const [countCards, setCountCards] = useState({ countRender: 0, moreMovies: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();



  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  function getMoviesFromApi() {
    mainApi.getSavedMovies()
      .then((cards) => {
        setLocalSavedMovies(cards);
        localStorage.setItem('localSavedMovies', JSON.stringify(cards));
      })
      .catch((err) => console.log(err));
  }

 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token);
    } else {
      setIsLoggedIn(false);
    }

  }, []);

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('localSavedMovies');
    localStorage.removeItem('localMovies');
    localStorage.removeItem('isShorts');
    localStorage.removeItem('isSavedShorts');
    localStorage.removeItem('title');
    localStorage.removeItem('savedTitle');
    setIsLoggedIn(false);
    setLocalMovies([]);
    setLocalSavedMovies([]);
    setCurrentUser({});
    history.push("/signin");
  }

  function handleLikeButton(movie, isSaved, isSavedMovies) {
    if (isSaved || isSavedMovies) {
      const movieId = isSavedMovies ? movie._id : localSavedMovies.find((item) => item.movieId === movie.id)._id;
      mainApi.deleteMovie(movieId)
        .then(() => {
          setLocalSavedMovies((state) => state.filter((c) => c._id !== movieId));
        })
        .catch((err) => console.log(err));
    } else {
      mainApi.addMovie(movie)
        .then((data) => {
          localStorage.setItem('localSavedMovies', JSON.stringify(localSavedMovies));
          setLocalSavedMovies([data, ...localSavedMovies]);
        })
        .catch((err) => console.log(err));
    }
  }

  function filterMovies(movies, isShorts, title) {
    if (isShorts)
      return movies.filter(movie => movie.nameRU.includes(title) && movie.duration <= 40)
    else {
      return movies.filter(movie => movie.nameRU.includes(title))
    }
  }

  function onSearchMovies(title, isShorts, isSavedMovies) {
    if (isSavedMovies) {
      const savedMovies = JSON.parse(localStorage.getItem('localSavedMovies'));
      setLocalSavedMovies(filterMovies(savedMovies, isShorts, title));
      localStorage.setItem('isSavedShorts', JSON.stringify(isShorts));
      localStorage.setItem('savedTitle', JSON.stringify(title));
    } else {
      setIsPreloader(true);
      moviesApi.getMovies()
        .then((data) => {
          const filteredMovies = filterMovies(data, isShorts, title);
          setLocalMovies(filteredMovies);
          calcRenderCards();
          setIsErrorMovie(false);
          localStorage.setItem('localMovies', JSON.stringify(filteredMovies));
          localStorage.setItem('isShorts', JSON.stringify(isShorts));
          localStorage.setItem('title', JSON.stringify(title));
        })
        .catch((err) => {
          setIsErrorMovie(true);
          console.log(err)
        })
        .finally(() => setIsPreloader(false));
    }
  }

  function calcRenderCards() {
    const width = window.innerWidth;
    if (width >= 1280) {
      return setCountCards({ countRender: 16, moreMovies: 4 })
    }
    if (width >= 990) {
      return setCountCards({ countRender: 12, moreMovies: 3 })
    }
    if (width >= 767) {
      return setCountCards({ countRender: 8, moreMovies: 2 })
    }
    if (width < 767) {
      return setCountCards({ countRender: 5, moreMovies: 1 })
    }
  }

  function checkToken(token) {
    mainApi
      .checkToken(token)
      .then((data) => {
        setCurrentUser({
          email: data.email,
          name: data.name
        });
        getMoviesFromApi();
        history.push("/movies");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Соединение было прервано");
        } else {
          console.log(err);
        }
      })
  }

  function handleLogin({ email, password }) {
    mainApi
      .signIn({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          mainApi.updateToken();
          checkToken(data.token);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log("%c" + err, "color: #dd3333");
      });
  }

  function handleRegister({ name, email, password }) {
    mainApi
      .signUp({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log("%c" + err, "color: #dd3333");
      });
  }

  function handleUpdateUserInfo({ name, email }) {
    mainApi
      .updateUserInfo({ name, email })
      .then((data) => {
        setCurrentUser({
          email: data.email,
          name: data.name
        });
      })
      .catch((err) => {
        console.log("%c" + err, "color: #dd3333");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__content">
          <Switch>
            <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen}/>
              <Movies
                countCards={countCards}
                onSearchMovies={onSearchMovies}
                localMovies={localMovies}
                localSavedMovies={localSavedMovies}
                isPreloader={isPreloader}
                isErrorMovie={isErrorMovie}
                isSavedMovies={false}
                handleLikeButton={handleLikeButton}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen}/>
              <SavedMovies
                onSearchMovies={onSearchMovies}
                localSavedMovies={localSavedMovies}
                isSavedMovies={true}
                handleLikeButton={handleLikeButton}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen}/>
              <Profile onSignOut={handleSignOut} onUpdateUserInfo={handleUpdateUserInfo} />
            </ProtectedRoute>
            <Route path="/signup">
              <Header isForm={true} setIsOpen={setIsOpen} isOpen={isOpen}/>
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Header isForm={true} setIsOpen={setIsOpen} isOpen={isOpen}/>
              <Login onLogin={handleLogin} />
            </Route>
            <Route exact path="/">
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen}/>
              <Main />
              <Footer />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}