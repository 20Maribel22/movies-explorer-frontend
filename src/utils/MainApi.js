class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._movies = JSON.parse(localStorage.getItem("saved-movies") || "[]");
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  getHeaders() {
    const headers = {
      ...this._headers,
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    return headers;
  }

  _handleResponse(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(new Error(data.message));
    });
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._handleResponse(res));
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._handleResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => this._handleResponse(res));
  }

  async getMovies() {
    if (this._movies.length === 0) {
      return fetch(`${this._baseUrl}/movies`, {
        method: "GET",
        headers: this.getHeaders(),
      })
        .then((res) => this._handleResponse(res))
        .then((cards) => {
          this._movies = cards;
          localStorage.setItem("saved-movies", JSON.stringify(cards));
          return cards;
        });
    }
    return this._movies;
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(movie),
    })
      .then((res) => this._handleResponse(res))
      .then((card) => {
        this._movies.push(card);
        localStorage.setItem("saved-movies", JSON.stringify(this._movies));
        return card;
      });
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
      .then((res) => this._handleResponse(res))
      .then((card) => {
        this._movies = this._movies.filter((movie) => movie._id !== movieId);
        localStorage.setItem("saved-movies", JSON.stringify(this._movies));
        return this._movies;
      });
  }
}

export const mainApi = new MainApi({
  // baseUrl: 'https://api.diploma.maribel.nomoredomains.club',
  baseUrl: "http://localhost:3001",
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  },
});
