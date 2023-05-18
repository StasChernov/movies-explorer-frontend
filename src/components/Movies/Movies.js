import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import SearchForm from './SearchForm/SearchForm.js'
import Preloader from './Preloader/Preloader.js'
import { useEffect, useState } from 'react';

export default function Movies({ onSearchMovies, localMovies, localSavedMovies, isPreloader, countCards, isErrorMovie, isSavedMovies, handleLikeButton }) {

  const [countShowCards, setCountShowCards] = useState(0);
  const [moreButton, setMoreButton] = useState(false);
    
  useEffect(() => {
    setCountShowCards(countCards.countRender);
  }, [countCards.countRender, localMovies]
  )

  useEffect(() => {
    (localMovies.length <= countShowCards) ? setMoreButton(false) : setMoreButton(true);
  }, [localMovies, countShowCards]
  )

  function startNewSearch () {
    setCountShowCards(0); 
  }

 return (
    <>
      <section className="movies">
        <SearchForm
          onSearchMovies={onSearchMovies}
          startNewSearch = {startNewSearch}
          isSavedMovies = {isSavedMovies}
        />
        {isPreloader ? <Preloader /> :
          <MoviesCardList
            localSavedMovies={localSavedMovies}
            movies={localMovies}
            countShowCards={countShowCards}
            handleLikeButton={handleLikeButton}
            isSavedMovies = {isSavedMovies}
          />}
         {isErrorMovie && <span className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>}
      </section>
      {moreButton && <button type="submit" className="movies__more-button" onClick={(() => setCountShowCards(countShowCards + countCards.moreMovies)) }>Ещё</button>}
    </>
  );
}