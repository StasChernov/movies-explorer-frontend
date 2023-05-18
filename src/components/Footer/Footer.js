import './Footer.css';

export default function Footer() {

  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <section className="footer__info">
        <span className="footer__copyrights">&copy; 2023 Чернов Станислав</span>
        <ul className="footer__links">
          <li><span className="footer__link">Яндекс.Практикум</span></li>
          <li><a className="footer__link" href="https://github.com/StasChernov">Github</a></li>
        </ul>
      </section>
    </footer>
  );
}