import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js'

export default function SavedMovies({ localSavedMovies, handleLikeButton, onSearchMovies }) {

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