import './PageNotFound.css';

export default function NotFound({history}) {

function handleGoBack () {
  history.goBack();
}

  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__paragraph">Страница не найдена</p>
      <button className="page-not-found__button" onClick={handleGoBack}>Назад</button>
    </section>
  );
}