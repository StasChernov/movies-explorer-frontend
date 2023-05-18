import { NavLink } from 'react-router-dom';
import './PageNotFound.css';

export default function NotFound() {

  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__paragraph">Страница не найдена</p>
      <NavLink className="page-not-found__link" to="/">Назад</NavLink>
    </section>
  );
}