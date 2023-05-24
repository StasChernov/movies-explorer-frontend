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

import { BIG_WIDTH_SCREEN } from "../../utils/constants";
import { MIDDLE_WIDTH_SCREEN } from "../../utils/constants";
import { SMALL_WIDTH_SCREEN } from "../../utils/constants";
import { BIG_FIRST_RENDERED_CARDS } from "../../utils/constants";
import { MIDDLE_FIRST_RENDERED_CARDS } from "../../utils/constants";
import { SMALL_FIRST_RENDERED_CARDS } from "../../utils/constants";
import { MICRO_FIRST_RENDERED_CARDS } from "../../utils/constants";
import { BIG_MORE_CARDS } from "../../utils/constants";
import { MIDDLE_MORE_CARDS } from "../../utils/constants";
import { SMALL_MORE_CARDS } from "../../utils/constants";
import { MICRO_MORE_CARDS } from "../../utils/constants";
import { DURATION } from "../../utils/constants";


export default function App() {

  const [localSavedMovies, setLocalSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isErrorMovie, setIsErrorMovie] = useState(false);
  const [countCards, setCountCards] = useState({ countRender: 0, moreMovies: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [errorSignIn, SetErrorSignIn] = useState("");
  const [errorSignUp, SetErrorSignUp] = useState("");
  const [errorProfile, SetErrorProfile] = useState("");
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.updateToken();
      checkToken(token);
    } else {
      setIsLoggedIn(false);
    }

  }, []);

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('localMovies');
    localStorage.removeItem('isShorts');
    localStorage.removeItem('title');
    setIsLoggedIn(false);
    setLocalSavedMovies([]);
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    setCurrentUser({});
    SetErrorSignIn("");
    SetErrorSignUp("");
    history.push("/");
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
          setLocalSavedMovies([data, ...localSavedMovies]);
        })
        .catch((err) => console.log(err));
    }
  }

  function filterMovies(movies, isShorts, title) {

    const filter = title.toLowerCase();

    if (isShorts) {
      return movies.filter(movie => movie.nameRU.toLowerCase().includes(filter) && movie.duration <= DURATION)
    } else {
      return movies.filter(movie => movie.nameRU.toLowerCase().includes(filter))
    }
  }

  useEffect(() => {
    setFilteredSavedMovies(localSavedMovies);
  }, [localSavedMovies])

  function getMoviesFromApi() {
    mainApi.getSavedMovies()
      .then((cards) => {
        setLocalSavedMovies(cards);
        setFilteredSavedMovies(cards);
      })
      .catch((err) => console.log(err));
  }

  function onSearchMovies(title, isShorts, isSavedMovies) {
    if (isSavedMovies) {
      setFilteredSavedMovies(filterMovies(localSavedMovies, isShorts, title));
    } else {
      const movies = JSON.parse(localStorage.getItem('localMovies'));
      console.log(movies);
      if (movies) {
        setFilteredMovies(filterMovies(movies, isShorts, title));
        calcRenderCards();
        isShorts ? localStorage.setItem('isShorts', JSON.stringify(true)) : localStorage.setItem('isShorts', JSON.stringify(false));
        localStorage.setItem('title', JSON.stringify(title));
      } else {
        setIsPreloader(true);
        moviesApi.getMovies()
          .then((data) => {
            localStorage.setItem('localMovies', JSON.stringify(data));
            setIsErrorMovie(false);
            setFilteredMovies(filterMovies(data, isShorts, title));
            calcRenderCards();
            isShorts ? localStorage.setItem('isShorts', JSON.stringify(true)) : localStorage.setItem('isShorts', JSON.stringify(false));
            localStorage.setItem('title', JSON.stringify(title));
          })
          .catch((err) => {
            setIsErrorMovie(true);
          })
          .finally(() => setIsPreloader(false));
      }
    }
  }

  function calcRenderCards() {
    const width = window.innerWidth;
    if (width >= BIG_WIDTH_SCREEN) {
      return setCountCards({ countRender: BIG_FIRST_RENDERED_CARDS, moreMovies: BIG_MORE_CARDS })
    }
    if (width >= MIDDLE_WIDTH_SCREEN) {
      return setCountCards({ countRender: MIDDLE_FIRST_RENDERED_CARDS, moreMovies: MIDDLE_MORE_CARDS })
    }
    if (width >= SMALL_WIDTH_SCREEN) {
      return setCountCards({ countRender: SMALL_FIRST_RENDERED_CARDS, moreMovies: SMALL_MORE_CARDS })
    }
    if (width < SMALL_WIDTH_SCREEN) {
      return setCountCards({ countRender: MICRO_FIRST_RENDERED_CARDS, moreMovies: MICRO_MORE_CARDS })
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
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log("%c" + err, "color: #dd3333");
        SetErrorSignIn(err);
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
        SetErrorSignUp(err);
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
        SetErrorProfile(err);
        console.log("%c" + err, "color: #dd3333");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__content">
          <Switch>
            <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen} />
              <Movies
                countCards={countCards}
                onSearchMovies={onSearchMovies}
                localMovies={filteredMovies}
                localSavedMovies={localSavedMovies}
                isPreloader={isPreloader}
                isErrorMovie={isErrorMovie}
                isSavedMovies={false}
                handleLikeButton={handleLikeButton}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen} />
              <SavedMovies
                onSearchMovies={onSearchMovies}
                localSavedMovies={filteredSavedMovies}
                isSavedMovies={true}
                handleLikeButton={handleLikeButton}
                getMoviesFromApi={getMoviesFromApi}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen} />
              <Profile onSignOut={handleSignOut} onUpdateUserInfo={handleUpdateUserInfo} errorMessage={errorProfile} setErrorMessage={SetErrorProfile} />
            </ProtectedRoute>
            <Route path="/signup">
              <Header isForm={true} setIsOpen={setIsOpen} isOpen={isOpen} />
              <Register onRegister={handleRegister} errorMessage={errorSignUp} setErrorMessage={SetErrorSignUp} />
            </Route>
            <Route path="/signin">
              <Header isForm={true} setIsOpen={setIsOpen} isOpen={isOpen} />
              <Login onLogin={handleLogin} errorMessage={errorSignIn} setErrorMessage={SetErrorSignIn} />
            </Route>
            <Route exact path="/">
              <Header isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} isOpen={isOpen} />
              <Main />
              <Footer />
            </Route>
            <Route path="*">
              <PageNotFound history={history} />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}