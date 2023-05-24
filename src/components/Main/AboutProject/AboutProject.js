import './AboutProject.css';

export default function AboutProject() {
  return (
    <article className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__two-columns">
        <section className="about-project__column">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </section>
        <section className="about-project__column">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </section>
      </div>
      <div className="about-project__progress-bar ">
        <section className="about-project__progress-column about-project__progress-column_type_front">
          <h3 className="about-project__progress-title about-project__progress-title_color_green">1 неделя</h3>
          <span className="about-project__progress-text">Back-end</span>
        </section>
        <section className="about-project__progress-column about-project__progress-column_type_back">
          <h3 className="about-project__progress-title about-project__progress-title_color_gray">4 недели</h3>
          <span className="about-project__progress-text">Front-end</span>
        </section>
      </div>
    </article>
  );
}