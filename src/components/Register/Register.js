import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Register.css';

export default function Register({ onRegister, errorMessage, setErrorMessage }) {
  
  const {values, handleChange, errors, isValid } = useFormWithValidation();

  useEffect(() => {setErrorMessage("")},[values]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <section className="entry">
      <h1 className="entry__title">Добро пожаловать!</h1>
      <form className="entry__form" onSubmit={handleSubmit}>
        <fieldset className="form__fields">
          <div className="field">
            <label className="field__label" htmlFor="input-name">Имя</label>
            <input
              className="field__input"
              id="input-name"
              type="text"
              pattern="[A-Za-zА-Яа-яёЁ\- ]{2,40}"
              placeholder="Имя"
              name="name"
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
            />
            <span className="form__error">{errors.name}</span>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="input-email">E-mail</label>
            <input
              className="field__input"
              id="input-email"
              type="email"
              placeholder="E-mail"
              name="email"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
            />
            <span className="form__error">{errors.email}</span>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="input-password">Пароль</label>
            <input
              className="field__input field__input_type_password"
              id="input-password"
              type="password"
              placeholder="Пароль"
              name="password"
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
            />
            <span className="form__error">{errors.password}</span>
          </div>
          <span className="form__api-error">{errorMessage}</span>
          <button type="submit" className={`form__button ${isValid && "form__button_active"}`} disabled={!isValid}>Зарегистрироваться</button>
        </fieldset>
      </form>
      <span className="entry__question">Уже зарегистрированы? <NavLink className="entry__link" to="/signin">Войти</NavLink></span>
    </section>
  );
}