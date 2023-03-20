import React from "react";
import './Portfolio.css';
import arrow from '../../../images/arrow.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__subtitle'>Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__item'>
                    <a className='animation portfolio__link' href='https://staschernov.github.io/how-to-learn/' target="_blank" rel="noreferrer" >
                        <p className="portfolio__name">Статичный сайт</p>
                        <img className='portfolio__arrow' src={arrow} alt='Стрелка'></img>
                    </a >
                </li>
                <li className='portfolio__item'>
                    <a className='animation portfolio__link' href='https://staschernov.github.io/russian-travel/' target="_blank" rel="noreferrer" >
                        <p className="portfolio__name">Адаптивный сайт</p>
                        <img className='portfolio__arrow' src={arrow} alt='Стрелка'></img>
                    </a>
                </li>
                <li className='portfolio__item'>
                    <a className='animation portfolio__link' href='https://staschernov.github.io/mesto/' target="_blank" rel="noreferrer" >
                        <p className="portfolio__name">Одностраничное приложение</p>
                        <img className='portfolio__arrow' src={arrow} alt='Стрелка'></img>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;