import './Header.css';
import headerLogo from '../../images/headerLogo.svg';
import headerIcon from '../../images/headerIcon.svg';
import burger from '../../images/burger.svg'
import close from '../../images/close.svg'
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header({ isLoggedIn, isForm, setIsOpen, isOpen }) {

  const [isRoot, setIsRoot] = useState(false);

  function headerBurgerButton () {
    setIsOpen(true);
  }

  function headerCloseButton () {
    setIsOpen(false);
  }

  const location = useLocation();
  useEffect(() => {
    setIsRoot('/' === location.pathname);
  }, [location.pathname]);

  return (
    <header className={`header ${!isRoot && "header_blacked"} ${isForm && "header_empty"}`}>
      <NavLink to="/"><img alt="Movie Explorer Logo" className="header__logo" src={headerLogo} /></NavLink>
      {!isForm && (isLoggedIn ?
        <>
          <nav className="menu menu_type_long">
            <div className="menu__group-items">
              <NavLink className="menu__item menu__item_type_group" to="/movies">Фильмы</NavLink>
              <NavLink className="menu__item" to="/saved-movies">Сохраненные фильмы</NavLink>
            </div>
            <NavLink className="menu__item menu__item_active" to="/profile">Аккаунт
              <img alt="Header Icon" className="header__icon" src={headerIcon} />
            </NavLink>
          </nav>
          <nav className="menu menu_type_short">
            <button className="menu__burger-button" onClick={headerBurgerButton}><img alt="Burger Icon" className="burger-button__icon" src={burger} /></button>
          </nav>
        </>
        :
        <nav className="menu"> <NavLink className="menu__item menu__item_type_alone" to="/signup">Регистрация</NavLink>
          <NavLink className="menu__item menu__item_color_green" to="/signin">Войти</NavLink>
        </nav>)
      }
      <div className={`header__burger-menu ${isOpen  && "header__burger-menu_isOpen"}`}>
        <div className="burger-menu__back">
          <button className="burger-menu__close-button" onClick={headerCloseButton}><img alt="Close Button" className="close-button__icon" src={close} /></button>
          <nav className="burger-menu__items">
            <div className="burger-menu__group-items">
              <NavLink exact className="burger-menu__item burger-menu__item_type_group" activeClassName="burger-menu__item_selected" to="/">Главная</NavLink>
              <NavLink className="burger-menu__item burger-menu__item_type_group" activeClassName="burger-menu__item_selected" to="/movies">Фильмы</NavLink>
              <NavLink className="burger-menu__item burger-menu__item_type_group" activeClassName="burger-menu__item_selected" to="/saved-movies">Сохраненные фильмы</NavLink>
            </div>
            <NavLink className="burger-menu__item burger-menu__item_type_alone" activeClassName="burger-menu__item_selected" to="/profile">Аккаунт
              <img alt="Header Icon" className="header__icon" src={headerIcon} />
            </NavLink>
          </nav>

        </div>
      </div>
    </header>
  );
}

