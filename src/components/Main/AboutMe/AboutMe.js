import React from "react";
import { Link } from "react-router-dom";
import './AboutMe.css';
import avatar from '../../../images/avatar.jpg';

function AboutMe() {
    return (
        <section className='about-me'>
            <div className='line'>
                <h2 className='title'>Студент</h2>
            </div>
            <article className='two-columns about-me__two-columns'>
                <div className='two-columns__column about-me__column'>
                    <div className='about-me__description'>
                        <h3 className='about-me__name'>Виталий</h3>
                        <h3 className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</h3>
                        <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    </div>
                    <a className='animation about-me__link' href="https://github.com/StasChernov">Github</a>
                </div>
                <figure className='two-columns__column about-me__image-container'>
                    <img className='avatar' src={avatar} alt="Фото"></img>
                </figure>
            </article>
        </section>
    )
}

export default AboutMe;