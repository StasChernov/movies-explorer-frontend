import React from "react";
import { useLocation } from 'react-router-dom';
import apiConfig from "../../../utils/Utils";
import './MoviesCard.css';

function MoviesCard({ card, liked, onCardLike }) {
    const location = useLocation();
    const isMoviesPage = location.pathname === '/movies';

    const likeButtonClassName = (
        `button cards__like ${liked ? "cards__like_type_like" : "cards__like_type_inactive"}`
    );

    function getCardImageSrc ({ image }) {
        return typeof image === 'object' && image !== null ? `${apiConfig.baseUrl}${image.url}` : image;
    };

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <li className="cards__item">
            <a className="cards__link" href={card.trailerLink} target="_blank" rel="noreferrer">
                <img className="cards__image" src={getCardImageSrc(card)} alt={`Фото ${card.nameRU}`} />
            </a>
            <div className="cards__description">
                <h2 className="cards__name">{card.nameRU}</h2>
                {isMoviesPage
                    ? (<button className={likeButtonClassName} type="button" aria-label="Избранное" onClick={handleLikeClick} />)
                    : (<button className="button cards__like cards__like_type_delete" type="button" aria-label="Избранное" onClick={handleLikeClick} />)}
            </div>
            <p className="cards__duration">{card.duration}</p>
        </li>
    );
}

export default MoviesCard;

