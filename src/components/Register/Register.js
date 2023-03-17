import {React, useState } from "react";
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo.svg';


function Register(props) {

const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
})

const [disabled, setDisabled] = useState(false);

function handleSubmit(e) {
    e.preventDefault();
    props.onRegister();
}

    return (
        <main className="main-register">
            <Link className='animation logo-register' to="/">
                <img className="logo" src={logo} alt="Логотип" />
            </Link>
            <form className="register" onSubmit={handleSubmit} noValidate>
                <h1 className="register__title">Добро пожаловать!</h1>
                <p className="register__name" htmlFor='name'>Имя</p>
                <input 
                    className="register__input" 
                    id='name'
                    name='name'
                    type="text" 
                    value={formValue.name}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <p className="register__name" htmlFor='email'>E-mail</p>
                <input 
                    className="register__input" 
                    id='email'
                    name='email'
                    type="email"
                    value={formValue.email}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <p className="register__name" htmlFor='password'>Пароль</p>
                <input 
                    className="register__input" 
                    id='password'
                    name='password'
                    type="password"
                    value={formValue.password}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <button className="button button_bg_blue register__button" type="submit" onSubmit={handleSubmit} disabled={disabled}>Зарегистрироваться</button>
            </form>
            <div className="register__signin">
                <p className="register__text">Уже зарегистрированы?</p>
                <Link className="animation register__signin-link" to="/signin">Войти</Link>
            </div>
        </main>
    )
};

export default Register;