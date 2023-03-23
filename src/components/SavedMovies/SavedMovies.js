import { React, useEffect } from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
  const savedSearchName = localStorage.getItem("search-saved-name") || "";
  const savedSearchShorts = (localStorage.getItem("search-saved-isShorts") === "true") ? true : false;
 
  useEffect(() => {
    props.onSearchSavedFilm(savedSearchName, savedSearchShorts);
  }, []);

  return (
        <div className="movies">
            <SearchForm
              onSubmit={props.onSearchSavedFilm}
              savedSearchName={savedSearchName}
              savedSearchShorts={savedSearchShorts}
            />
            <MoviesCardList
                allMovies={props.allMovies}
                savedMovies={props.savedMovies}
                savedIds={props.savedIds}
                isShowPreloader={props.isShowPreloader}
                onCardLike={props.onCardLike}
            />
        </div>
    )
}

export default SavedMovies;
