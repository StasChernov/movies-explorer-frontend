import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <section className='about-project'>
            <div className='line'>
                <h2 className='title'>О проекте</h2>
            </div>
            <article className='two-columns'>
                <div className='two-columns__column about-project__column'>
                    <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='two-columns__column about-project__column'>
                    <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </article>
            <article className='skala'>
                <div className="skala__cell skala__cell_green">
                    <span className="skala__text">1 неделя</span>
                </div>
                <div className="skala__cell skala__cell_grey">
                    <span className="skala__text">4 недели</span>
                </div>
                <div className="skala__cell">
                    <span className="skala__text">Back-end</span>
                </div>
                <div className="skala__cell">
                    <span className="skala__text">Back-end</span>
                </div>
            </article>
        </section>
    )
}

export default AboutProject;