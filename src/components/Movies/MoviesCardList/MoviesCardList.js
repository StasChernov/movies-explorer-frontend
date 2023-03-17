import {React}  from "react";
import '../../App/App.css';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
    
    return (
        <section className="cards">
            <ul className="cards__list">
                {props.cards.map((card, cardId) => (
                    <MoviesCard
                        card={card}
                    />
                ))}
            </ul>
            {props.isShowPreloader && <Preloader/>}
        </section>
    )
}

export default MoviesCardList;
