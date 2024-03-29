import React, { useState } from "react";
import './SearchForm.css';

function SearchForm() {

    const [searchName, setSearchName] = useState('');
    const [searchShorts, setSearchShorts] = useState(true);
    const [isRequestEmpty, setIsRequestEmpty] = useState(true);
    const [disabled, setDisabled] = useState(true);

    function handleChange(e) {
        if (e.target.value.length > 0) {
            setIsRequestEmpty(false)
            setDisabled(false)
        } else {
            setIsRequestEmpty(true)
            setDisabled(true)
        }
        setSearchName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (searchName.length === 0) {
            setIsRequestEmpty(true);
            return
        }
        setIsRequestEmpty(false);
    }

    function handleCheckbox(checkboxstatus) {
         setSearchShorts(checkboxstatus);
    }

    return (
        <section className="search">
            <form className="search-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <fieldset className="search-form__fieldset">
                    <input
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        value={searchName}
                        onChange={handleChange}
                    ></input>
                    <span className="search-form__error">{isRequestEmpty && "Нужно ввести ключевое слово"}</span>
                    <button
                        className="animation button search-form__button"
                        type="submit"
                        aria-label="Найти"
                        disabled={disabled}
                    ></button>
                </fieldset>
                <fieldset className="search-form__fieldset search-form__fieldset_type_tumb">
                    <input
                        className='checkbox'
                        type='checkbox'
                        checked={searchShorts}
                        onChange={() => handleCheckbox(!searchShorts)}
                    ></input>
                    <h2 className="search-form__title">Короткометражки</h2>
                </fieldset>
            </form>
        </section>
    )
}

export default SearchForm;