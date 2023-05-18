import './SearchForm.css';

import magnifyingGlass from '../../../images/magnifyingGlass.svg';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

export default function SearchForm({ onSearchMovies, startNewSearch, isSavedMovies }) {

  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [isShorts, setIsShorts] = useState("");

  const inputFilmTitle = useRef();
  const inputIsShorts = useRef();

  useEffect(() => {
    if (isSavedMovies) {
      const title = JSON.parse(localStorage.getItem('savedTitle'));
      if (title) {
        setTitle(title);
        inputFilmTitle.current.value = title;
      }
      const isShorts = JSON.parse(localStorage.getItem('isSavedShorts'))
      if (isShorts) {
        setIsShorts(isShorts);
        inputIsShorts.current.checked = isShorts;
      }
    }
    else {
      const title = JSON.parse(localStorage.getItem('title'));
      if (title) {
        setTitle(title);
        inputFilmTitle.current.value = title;
      }
      const isShorts = JSON.parse(localStorage.getItem('isShorts'))
      if (isShorts) {
        setIsShorts(isShorts);
        inputIsShorts.current.checked = isShorts;
      }
    }
  }, []
  )

  function handleSubmit(e) {
    e.preventDefault();
    if (!title && !isSavedMovies) {
      setError("Нужно ввести ключевое слово")
    }
    else {
      !isSavedMovies && startNewSearch();
      onSearchMovies(title, isShorts, isSavedMovies);
      setError("");
    };
  }

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleCheckbox(e) {
    setIsShorts(e.target.checked);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <fieldset className="search-form__field search-form__field_type_text">
        <input
          ref={inputFilmTitle}
          className="search-form__input"
          id="input-film-title"
          type="text"
          onChange={handleChange}
          placeholder="Фильм"
          name="filmtitle"
        />
        <button type="submit" className="search-form__button"><img src={magnifyingGlass} alt="Magnifying Glass" /></button>
      </fieldset>
      <span className="search-form__error">{error}</span>
      <fieldset className="search-form__field search-form__field_type_checkbox">
        <div className="search-form__checkbox">
          <input className="checkbox__btn" type="checkbox" id="check" onClick={handleCheckbox} ref={inputIsShorts} />
          <label htmlFor="check" className="checkbox__slide"></label>
        </div>
        <label className="search-form__checkbox-label" htmlFor="check">Короткометражки</label>
      </fieldset>
    </form>
  );
}