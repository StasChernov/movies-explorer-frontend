import React from "react";
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card}) {
    const location = useLocation();

    const isMoviesPage = location.pathname === '/movies';

    return (
        <li className="cards__item">
            <a className="cards__link" href="" target="_blank" rel="noreferrer">
                <img className="cards__image" src={card.image} alt={`Фото ${card.nameRU}`} />
            </a>
            <div className="cards__description">
                <h2 className="cards__name">{card.nameRU}</h2>
                {isMoviesPage
                    ? (<button className="button cards__like cards__like_type_like" type="button" aria-label="Избранное"/>)
                    : (<button className="button cards__like cards__like_type_delete" type="button" aria-label="Избранное" />)}
            </div>
            <p className="cards__duration">{card.duration}</p>
        </li>
    );
}

export default MoviesCard;

