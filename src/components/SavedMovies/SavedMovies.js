import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js'
import { useEffect } from 'react';

export default function SavedMovies({ localSavedMovies, handleLikeButton, onSearchMovies }) {

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('savedTitle')))
      onSearchMovies(JSON.parse(localStorage.getItem('savedTitle')), JSON.parse(localStorage.getItem('isSavedShorts')), true);
  },[])

  return (
    <>
      <section className="saved-movies">
        <SearchForm 
          isSavedMovies={true}
          onSearchMovies={onSearchMovies}
        />
        <MoviesCardList
          localSavedMovies={localSavedMovies}
          movies={localSavedMovies}
          isSavedMovies={true}
          countShowCards={localSavedMovies.length}
          handleLikeButton={handleLikeButton}
        />
      </section>
    </>
  );
}