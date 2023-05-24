import { useContext, useEffect, useRef } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';

export default function Profile({ onSignOut, onUpdateUserInfo, errorMessage, setErrorMessage, isBlock }) {

  const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  const refName = useRef();
  const refEmail = useRef();

  useEffect(() => {
    refName.current.value = currentUser.name;
    refEmail.current.value = currentUser.email
  }, [currentUser]);

  useEffect(() => { setErrorMessage("") }, [values]);

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
    onUpdateUserInfo({ name: refName.current.value, email: refEmail.current.value });
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
              readOnly={isBlock}
              className="profile-form__input"
              id="input-name"
              pattern="[A-Za-zА-Яа-яёЁ\- ]{2,40}"
              type="text"
              ref={refName}
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
              readOnly={isBlock}
              id="input-email"
              type="email"
              ref={refEmail}
              name="email"
              onChange={handleChange}
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              required
              minLength="2"
              maxLength="40"
            />
          </div>
          <span className="profile-form__error">{errors.email}</span>
          <span className="profile__api-error">{errorMessage}</span>
          <button type="submit" className={`profile-form__button ${isValid && "profile-form__button_active"}`} disabled={!isValid}>Редактировать</button>
        </fieldset>
      </form>
      <button onClick={onSignOut} className="profile__logout">Выйти из аккаунта</button>
    </section>
  );
}