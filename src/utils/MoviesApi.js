import { mainApi } from "./MainApi";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._movies = JSON.parse(localStorage.getItem("beatfilm-movies") || "[]");
  }

  _handleResponse(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(new Error(data.message));
    });
  }

  async getAllMovies() {
    if (this._movies.length === 0) {
      return fetch(`${this._baseUrl}`, {
        method: "GET",
        headers: this._headers,
      })
        .then((res) => this._handleResponse(res))
        .then((cards) =>
          mainApi.getMovies().then((mainCards) => [cards, mainCards])
        )
        .then(([beatCards, mainCards]) => {
          this._movies = beatCards.map((beatCard) => {
            beatCard.saved = !!mainCards.find(
              (mainCard) => mainCard.movieId === beatCard.id
            );
            return beatCard;
          });

          localStorage.setItem("beatfilm-movies", JSON.stringify(this._movies));

          return this._movies;
        });
    }
    return this._movies;
  }

  saveMovie(film) {
    this._movies = this._movies.map((movie) => {
      if (movie.id === film.movieId) {
        movie.saved = true;
      }
      return movie;
    });
    localStorage.setItem("beatfilm-movies", JSON.stringify(this._movies));

    return this._movies;
  }

  deleteMovie(movieId) {
    this._movies = this._movies.map((movie) => {
      if (movie.id === movieId) {
        movie.saved = false;
      }
      return movie;
    });
    localStorage.setItem("beatfilm-movies", JSON.stringify(this._movies));
    return this._movies;
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  },
});
