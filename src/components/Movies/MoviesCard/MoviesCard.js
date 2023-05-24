import './MoviesCard.css';
import { API_MOVIES_URL} from '../../../utils/constants';

export default function MoviesCard({ movie, localSavedMovies, handleLikeButton, isSavedMovies }) {
  const isSaved = !isSavedMovies && localSavedMovies.some((item) => item.movieId === movie.id);

  function onlikeButton() {
    handleLikeButton(movie, isSaved, isSavedMovies);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__image-container">
        <a href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
          className="movies-card__link"
        >
          <img
            className="movies-card__image"
            src={isSavedMovies ? `${movie.image}` : `${API_MOVIES_URL}${movie.image.url}`}
            alt={movie.nameRU}
          />
        </a>
      </div>
      <div className="movies-card__footer">
        <div className="movies-card__base">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <button
            className={`movies-card__like-button ${isSavedMovies && "movies-card__delete-button"} ${isSaved && "movies-card__like-button_liked"}`} type="button" onClick={onlikeButton}
          ></button>
        </div>
        <span className="movies-card__duration">{movie.duration}</span>
      </div>
    </li>
  );
}