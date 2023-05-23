import { API_MOVIES_URL} from "../utils/constants";

class MoviesApi {
  constructor({ headers, apiMoviesURL }) {
    this._apiMoviesURL = apiMoviesURL;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._apiMoviesURL, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }
}

export const moviesApi =  new MoviesApi({
  headers: { 'Content-Type': 'application/json' },
  apiMoviesURL: `${API_MOVIES_URL}/beatfilm-movies`
});
