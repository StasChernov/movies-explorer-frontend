import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';


function Login(props) {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {

    if(emailError || passwordError) {
        setFormValid(false);
    } else {
        setFormValid(true);
    }
  }, [emailError, passwordError]);

  function handleEmail (e) {
    setEmail(e.target.value);
    if(!e.target.value) {
        setFormValid(false);
    }
    setEmailError(e.target.validationMessage);  
  }
  
  function handlePassword (e) {
    setPassword(e.target.value);
    if(!e.target.value) {
        setFormValid(false);
    }
    setPasswordError(e.target.validationMessage);
  }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(email, password);
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
                    pattern=".+@.+\..+"
                    id='email'
                    name='email'
                    value={email.email}
                    onChange={handleEmail}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <span className="register__error">{emailError}</span>
                <p className="login__name">Пароль</p>
                <input
                    className="login__input"
                    type="password"
                    id='password'
                    name='password'
                    value={password.password}
                    onChange={handlePassword}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <span className="register__error">{passwordError}</span>
                <button className="button button_bg_blue login__button" type="submit" disabled={!isFormValid}>Войти</button>
            </form>
            <div className="login__signup">
                <p className="login__text">Ещё не зарегистрированы?</p>
                <Link className="animation login__signup-link" to="/signup">Регистрация</Link>
            </div>
        </main>
    )
};

export default Login;