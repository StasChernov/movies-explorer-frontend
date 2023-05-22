import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard.js'

export default function MoviesCardList({ localSavedMovies, movies, countShowCards, isSavedMovies, handleLikeButton }) {

  return (
    <ul className="movies-card-list">
      {movies.map((movie, index) => {
        if (index < countShowCards) {
        return (
          <MoviesCard
            localSavedMovies={localSavedMovies}
            key={index}
            movie={movie}
            isSavedMovies={isSavedMovies}
            handleLikeButton={handleLikeButton}
          />
        )}     
      })}
    </ul>
  );
}