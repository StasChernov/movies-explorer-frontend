import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js'
import { useEffect, useState } from 'react';
import { mainApi } from '../../utils/MainApi';

export default function SavedMovies({localSavedMovies, handleLikeButton, onSearchMovies, getMoviesFromApi }) {

  useEffect(() => {
    getMoviesFromApi();
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