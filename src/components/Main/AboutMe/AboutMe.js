import './AboutMe.css';
import photo from '../../../images/photo.png';

export default function AboutMe() {
  return (
    <article className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__two-columns">
        <section className="about-me__column">
          <h3 className="about-me__subtitle">Виталий</h3>
          <span className="about-me__profession">Фронтенд-разработчик, 30 лет</span>
          <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className='about-me__git' href="https://github.com/StasChernov">Github</a>
        </section>
        <img alt="Avatar" className="about-me__photo" src={photo} />
      </div>
    </article>
  );
}