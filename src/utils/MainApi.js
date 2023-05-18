
class Api {
  constructor({ headers, apiURL }) {
    this._apiURL=apiURL;
    this._apiUserURL = `${apiURL}/users/me`;
    this._apiCardsURL = `${apiURL}/movies`;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSavedMovies() {
    return fetch(this._apiCardsURL, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  deleteMovie(cardId) {
    return fetch(`${this._apiCardsURL}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  addMovie(movie) {
    return fetch(this._apiCardsURL, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.created_at,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
      }),
    }).then((res) => this._handleResponse(res));
  }

  signIn({ email, password }) {
    console.log(email);
    console.log(password);
    return fetch(`${this._apiURL}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((res) => this._handleResponse(res));
  }

  signUp({ name, email, password }) {
    return fetch(`${this._apiURL}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => this._handleResponse(res));
  }

  checkToken(token) {
    if (!token) return Promise.reject(`Ошибка: Отсутствует токен`);
    return fetch(`${this._apiUserURL}`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._handleResponse(res));
  }

  updateToken() {
    this._headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }

  updateUserInfo({name, email}) {
    return fetch(this._apiUserURL, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        email,
        name,
      }),
    }).then((res) => this._handleResponse(res));
  }
}

export const mainApi =  new Api({headers: {
  authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
}, apiURL : 'https://api.movies.chernov.nomoredomains.club'});