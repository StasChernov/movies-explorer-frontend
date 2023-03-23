import { React} from "react";

import './Movies.css';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
    const savedSearchName = localStorage.getItem("search-name") || "";
    const savedSearchShorts = (localStorage.getItem("search-isShorts") === "true") ? true : false;

    return (
        <div className="movies">
            <SearchForm
                onSubmit={props.onSearchFilm}
                savedSearchName={savedSearchName}
                savedSearchShorts={savedSearchShorts}
                page='movies'
            />
            {props.isMoviesApiError && (
                <span className="register__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
            )}
            <MoviesCardList
                allMovies={props.allMovies}
                onCardLike={props.onCardLike}
                hasCards={props.hasCards}
                loadCards={props.loadCards}
                isShowPreloader={props.isShowPreloader}
                savedIds={props.savedIds}
            />
        </div>
    )
}

export default Movies;
