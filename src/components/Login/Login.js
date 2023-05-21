import { NavLink } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import '../Register/Register.css';

export default function Login({ onLogin }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (

    <section className="entry">
      <h1 className="entry__title">Рады видеть!</h1>
      <form className="entry__form" onSubmit={handleSubmit}>
        <fieldset className="form__fields">
          <div className="field">
            <label className="field__label" htmlFor="input-email">E-mail</label>
            <input
              className="field__input"
              id="input-email"
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
              name="email"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="form__error">{errors.email}</span>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="input-password">Пароль</label>
            <input
              className="field__input"
              id="input-password"
              type="password"
              placeholder="Пароль"
              onChange={handleChange}
              name="password"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="form__error">{errors.password}</span>
          </div>
          <button type="submit" className={`form__button form__button_type_login ${isValid && "form__button_active"}`} disabled={!isValid}>Войти</button>
        </fieldset>
      </form>
      <span className="entry__question entry__question_type_login">Еще не зарегистрированы? <NavLink className="entry__link" to="/signup">Регистрация</NavLink></span>
    </section>
  );
}