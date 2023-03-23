import {React}  from "react";
import '../../App/App.css';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
    
    return (
        <section className="cards">
            <ul className="cards__list">
                {props.allMovies.map((card, cardId) => (
                    <MoviesCard
                        key={cardId}
                        card={card}
                        liked={props.savedIds.includes(card.id || card.movieId)}
                        onCardLike={props.onCardLike}
                    />
                ))}
            </ul>
            {props.isShowPreloader && <Preloader/>}
            {!props.isShowPreloader && props.allMovies.length === 0 && (<span className="register__error">По вашему запросу ничего не найдено</span>)}
            {props.hasCards && (<button className="button button_bg_black cards__button" type="button" onClick={props.loadCards}>Ещё</button>)
        }
        </section>
    )
}

export default MoviesCardList;
