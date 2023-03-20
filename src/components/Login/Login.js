import { React, useState } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';


function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const [disabled, setDisabled] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin();
    }

    return (
        <main className="main-login">
            <Link className='animation logo-login' to="/">
                <img className="logo" src={logo} alt="Логотип" />
            </Link>
            <form className="login" onSubmit={handleSubmit} noValidate>
                <h1 className="login__title">Рады видеть!</h1>
                <p className="login__name">E-mail</p>
                <input
                    className="login__input"
                    type="email"
                    id='email'
                    name='email'
                    defaultValue={formValue.email}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <p className="login__name">Пароль</p>
                <input
                    className="login__input"
                    type="password"
                    id='password'
                    name='password'
                    defaultValue={formValue.password}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <button className="button button_bg_blue login__button" type="submit" disabled={disabled}>Войти</button>
            </form>
            <div className="login__signup">
                <p className="login__text">Ещё не зарегистрированы?</p>
                <Link className="animation login__signup-link" to="/signup">Регистрация</Link>
            </div>
        </main>
    )
};

export default Login;