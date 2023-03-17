import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import '../App/App.css';
import './Profile.css';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);

    const [formValue, setFormValue] = useState({
        name: "",
        email: ""
    })
    
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setFormValue((state) => ({
            ...state,
            name: currentUser.name,
            email: currentUser.email
        })
        );
    }, [currentUser.name, currentUser.email]);

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <main className="main-profile">
            <form className="profile" noValidate>
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <div className="profile__form">
                    <p className="profile__name" htmlFor='name'>Имя</p>
                    <input
                        className="profile__input"
                        id='name'
                        name='name'
                        type="text"
                        value={formValue.name}
                        minLength="2"
                        maxLength="30"
                        required>
                    </input>
                </div>
                <div className="profile__form">
                    <p className="profile__name" htmlFor='email'>E-mail</p>
                    <input
                        className="profile__input"
                        id='email'
                        name='email'
                        type="email"
                        value={formValue.email}
                        minLength="2"
                        maxLength="30"
                        required>
                    </input>
                </div>
                <button className="button profile__button" type="submit"
                    onClick={handleSubmit}
                    disabled={disabled}
                >Редактировать</button>
                <button className="button profile__button profile__button_type_link" onClick={props.onLogout}>Выйти из аккаунта</button>
                <button className="button button_bg_black profile__button profile__button_type_save" type='submit' onSubmit={handleSubmit}>Сохранить</button>
            </form>
        </main>
    )
};

export default Profile;