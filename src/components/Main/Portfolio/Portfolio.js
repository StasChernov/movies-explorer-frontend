import './Portfolio.css';

export default function Portfolio() {
  return (
    <article className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className='portfolio__jobs'>
        <li className="portfolio__job">
          <a className="portfolio__link" href="https://staschernov.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__job">
          <a className="portfolio__link" href="https://staschernov.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__job">
          <a className="portfolio__link" href="https://staschernov.github.io/mesto/" target="_blank" rel="noreferrer">Одностраничное приложение
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
      </ul>
    </article>
  );
}