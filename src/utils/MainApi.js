import { apiURL } from "../utils/constants";
import { apiMoviesURL} from "../utils/constants";

class Api {
  constructor({ headers, apiURL, apiMoviesURL }) {
    this._apiURL = apiURL;
    this._apiUserURL = `${apiURL}/users/me`;
    this._apiCardsURL = `${apiURL}/movies`;
    this._headers = headers;
    this._apiMoviesURL = apiMoviesURL;
  }

  _handleResponse(res, type) {
    if (res.ok) {
      return res.json();
    } else {
      let message = "";

      switch (res.status) {
        case 400:
          if (type === "signIn") message = "Не передано одно из полей.";
          else if (type === "signUp")
            message = "Некорректно заполнено одно из полей.";
          else message = "Токен не передан или передан не в том формате.";
          break;
        case 401:
          if (type === "signIn") message = "Неверные почта или пароль.";
          break;
        case 409:
          if (type === "signUp") message = "Пользователь с таким email уже существует";
          else if (type === "update") message = "Пользователь с таким email уже существует";
          break;
        default:
          message = "Повторите попытку позже.";
      }

      return Promise.reject(`Ошибка: ${res.status}. ${message}`);
    }
  }

  getSavedMovies() {
    return fetch(this._apiCardsURL, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res, "get"));
  }

  deleteMovie(cardId) {
    return fetch(`${this._apiCardsURL}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res, "delete"));
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
        image: `${this._apiMoviesURL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${this._apiMoviesURL}${movie.image.url}`,
        movieId: movie.id,
      }),
    }).then((res) => this._handleResponse(res, "add"));
  }

  signIn({ email, password }) {
    return fetch(`${this._apiURL}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((res) => this._handleResponse(res, "signIn"));
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
    }).then((res) => this._handleResponse(res, "signUp"));
  }

  checkToken(token) {
    if (!token) return Promise.reject(`Ошибка: Отсутствует токен`);
    return fetch(`${this._apiUserURL}`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._handleResponse(res, "check"));
  }

  updateToken() {
    this._headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }

  updateUserInfo({ name, email }) {
    return fetch(this._apiUserURL, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        email,
        name,
      }),
    }).then((res) => this._handleResponse(res, "update"));
  }
}

export const mainApi = new Api({
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }, apiURL, apiMoviesURL
});