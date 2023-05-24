import './Promo.css';
import promoLogo from '../../../images/promoLogo.svg';

export default function Promo() {
  return (
    <article className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img alt="Promo Logo" className="promo__logo" src={promoLogo} />
    </article>
  );
}