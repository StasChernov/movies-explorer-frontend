import {React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo.svg';

function Register(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    if(nameError || emailError || passwordError) {
        setFormValid(false);
    } else {
        setFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

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
  
  function handlePassword (e) {
    setPassword(e.target.value);
    if(!e.target.value) {
        setFormValid(false);
    }
    setPasswordError(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(name, email, password);
  }

  return (
    <main className="main-register">
        <Link className='animation logo-register' to="/">
                <img className="logo" src={logo} alt="Логотип" />
           </Link>
            <form className="register" onSubmit={handleSubmit} noValidate>
                <h1 className="register__title">Добро пожаловать!</h1>
                <p className="register__name">Имя</p>
                <input 
                    className="register__input" 
                    id='name'
                    name='name'
                    type="text" 
                    value={name.name}
                    onChange={handleName}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <span className="register__error">{nameError}</span>
                <p className="register__name">E-mail</p>
                <input 
                    className="register__input" 
                    id='email'
                    name='email'
                    type="email"
                    pattern=".+@.+\..+"
                    value={email.email}
                    onChange={handleEmail}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <span className="register__error">{emailError}</span>
                <p className="register__name">Пароль</p>
                <input 
                    className="register__input" 
                    id='password'
                    name='password'
                    type="password"
                    value={password.password}
                    onChange={handlePassword}
                    minLength="2"
                    maxLength="30"
                    required>
                </input>
                <span className="register__error">{passwordError}</span>
                <button className="button button_bg_blue register__button" type="submit" onSubmit={handleSubmit} disabled={!isFormValid}>Зарегистрироваться</button>
            </form>
            <div className="register__signin">
                <p className="register__text">Уже зарегистрированы?</p>
                <Link className="animation register__signin-link" to="/signin">Войти</Link>
            </div>
        </main>
    )
};

export default Register;