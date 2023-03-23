import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import '../App/App.css';
import './Profile.css';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isFormValid, setFormValid] = useState(false);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser.name, currentUser.email]);

    function handleName (e) {
        setName(e.target.value);
        if(!e.target.value) {
            setFormValid(false);
        }
        setNameError(e.target.validationMessage);
      }
    
      function handleEmail (e) {
        setEmail(e.target.value);
        if(!e.target.value) {
            setFormValid(false);
        }
        setEmailError(e.target.validationMessage);  
      }

    useEffect(() => {
        if((name === currentUser.name && email === currentUser.email) || nameError || emailError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, emailError, currentUser.name, currentUser.email, name, email]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, email)
    }

    return (
        <main className="main-profile">
            <form className="profile" noValidate>
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <div className="profile__form">
                    <p className="profile__name">Имя</p>
                    <input
                        className="profile__input"
                        id='name'
                        name='name'
                        type="text"
                        value={name}
                        onChange={handleName}
                        minLength="2"
                        maxLength="30"
                        required>
                    </input>
                </div>
                <span className="register__error">{nameError}</span>
                <div className="profile__form">
                    <p className="profile__name">E-mail</p>
                    <input
                        className="profile__input"
                        id='email'
                        name='email'
                        type="email"
                        pattern=".+@.+\..+"
                        value={email}
                        onChange={handleEmail}
                        minLength="2"
                        maxLength="30"
                        required>
                    </input>
                </div>
                <span className="register__error">{emailError}</span>
                <button className="button profile__button" type="submit" onClick={handleSubmit} disabled={!isFormValid}>Редактировать</button>
                <button className="button profile__button profile__button_type_link" onClick={props.onLogout}>Выйти из аккаунта</button>
                <button className="button button_bg_black profile__button profile__button_type_save" type='submit'>Сохранить</button>
            </form>
        </main>
    )
};

export default Profile;