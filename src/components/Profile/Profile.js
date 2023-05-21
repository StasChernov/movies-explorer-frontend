import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect} from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';

export default function Profile({onSignOut, onUpdateUserInfo}) {

  const {values, handleChange, errors, isValid, setValues, setIsValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({
      email: currentUser.email,
      name: currentUser.name,
    });
  }, []);
    
  useEffect(() => {
    if (isValid) {
      if ((currentUser.email !== values.email) || (currentUser.name !== values.name)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  })

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUserInfo(values);
    setIsValid(false);
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <fieldset className="profile-form__fields">
          <div className="profile-form__field">
            <h3 className="field__title">Имя</h3>
            <input
              className="profile-form__input"
              id="input-name"
              pattern="[A-Za-zА-Яа-яёЁ\- ]{2,40}"
              type="text"
              value={values.name}
              name="name"
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
            />
          </div>
          <span className="profile-form__error">{errors.name}</span>
          <div className="profile-form__field profile-form__field_type_email">
            <h3 className="field__title">E-mail</h3>
            <input
              className="profile-form__input"
              id="input-email"
              type="email"
              value={values.email}
              name="email"
              onChange={handleChange}
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              required
              minLength="2"
              maxLength="40"
            />
          </div>
          <span className="profile-form__error">{errors.email}</span>
          <button type="submit" className={`profile-form__button ${isValid && "profile-form__button_active"}`} disabled={!isValid}>Редактировать</button>
        </fieldset>
      </form>
      <button onClick={onSignOut} className="profile__logout">Выйти из аккаунта</button>
    </section>
  );
}