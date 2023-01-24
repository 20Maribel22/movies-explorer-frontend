import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  NOTHIHG_FOUND_SERVER,
  CONFLICT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  UNAUTH_ERROR_CODE,
  UNAUTH_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
  DURATION_SHORT_FILM,
} from "../../utils/constants.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState(
    JSON.parse(localStorage.getItem("moviesAll")) || []
  );
  const [foundMovies, setFoundMovies] = React.useState(
    JSON.parse(localStorage.getItem("foundMovies")) || []
  );
  const [savedMovies, setSavedMovies] = React.useState(
    JSON.parse(localStorage.getItem("savedMovies")) || []
  );
  const [savedFoundMovies, setSavedFoundMovies] = React.useState(
    JSON.parse(localStorage.getItem("savedFoundMovies")) || []
  );
  const [nothingFoundServer, setNothingFoundServer] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [checkedSaved, setCheckedSaved] = React.useState(false);
  const [isWasRequest, setIsWasRequest] = React.useState(false);
  const [isWasSavedRequest, setIsWasSavedRequest] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isBadRequest, setIsBadRequest] = React.useState(false);
  const [isBadServerRequest, setIsBadServerRequest] = React.useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = React.useState(false);
  const seachTextSaved = localStorage.getItem("searchTextSaved");
  const seachText = localStorage.getItem("searchText");
  let navigate = useNavigate();

  React.useEffect(() => {
    let filterCheckboxValue = false;
    if (localStorage.getItem("filterCheckbox") === "true")
      filterCheckboxValue = true;

    setChecked(filterCheckboxValue);
  }, [checked]);

  React.useEffect(() => {
    let filterCheckboxValue = false;
    if (localStorage.getItem("filterCheckboxSaved") === "true")
      filterCheckboxValue = true;

    setCheckedSaved(filterCheckboxValue);
  }, [checkedSaved]);

  React.useEffect(() => {
    if (!loggedIn) tokenCheck();

    if (loggedIn) {
      mainApi
        .getMovies()
        .then((movies) => {
          setSavedMovies(movies);
          localStorage.setItem("savedMovies", JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (savedMovies.length > 0 && loggedIn) {
      const searchText = localStorage.getItem("searchTextSaved")
        ? localStorage.getItem("searchTextSaved")
        : "";
      const savedMoviesParsed = JSON.parse(localStorage.getItem("savedMovies"));
      const savedFoundMovies = handleFilterMovies(
        savedMoviesParsed,
        searchText,
        checkedSaved
      );
      setSavedFoundMovies(savedFoundMovies);
      localStorage.setItem(
        "savedFoundMovies",
        JSON.stringify(savedFoundMovies)
      );
    }
  }, [savedMovies]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    mainApi.setToken(jwt);
    if (jwt) {
      mainApi
        .getUserInfo()
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            navigate("/movies");
          } else {
            setLoggedIn(false);
            navigate("/");
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    } else {
      setLoggedIn(false);
      navigate("/");
    }
  };

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === CONFLICT_ERROR_CODE) {
          setIsBadRequest(true);
          setMessage(CONFLICT_ERROR_MESSAGE);
        } else if (err === BAD_REQUEST_ERROR_CODE) {
          setIsBadRequest(true);
          setMessage(BAD_REQUEST_ERROR_MESSAGE);
        } else {
          setIsBadRequest(true);
          setMessage(SERVER_ERROR_MESSAGE);
        }
      })
      .finally(() => {
        setTimeout(() => setIsBadRequest(false), 5000);
      });
  }

  function handleLogin(email, password) {
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === UNAUTH_ERROR_CODE) {
          setIsBadRequest(true);
          setMessage(UNAUTH_ERROR_MESSAGE);
        } else if (err === BAD_REQUEST_ERROR_CODE) {
          setIsBadRequest(true);
          setMessage(BAD_REQUEST_ERROR_MESSAGE);
        } else {
          setIsBadRequest(true);
          setMessage(SERVER_ERROR_MESSAGE);
        }
      })
      .finally(() => {
        setTimeout(() => setIsBadRequest(false), 5000);
      });
  }

  function handleUpdateUser(name, email) {
    mainApi
      .setUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user);
        setIsSuccessRequest(true);
        setMessage(SUCCESS_UPDATE_MESSAGE);
      })
      .catch((err) => {
        console.log(err);
        if (err === CONFLICT_ERROR_CODE) {
          setIsBadRequest(true);
          setMessage(CONFLICT_ERROR_MESSAGE);
        } else if (err === BAD_REQUEST_ERROR_CODE) {
          setIsBadRequest(true);
          setMessage(BAD_REQUEST_ERROR_MESSAGE);
        } else {
          setIsBadRequest(true);
          setMessage(SERVER_ERROR_MESSAGE);
        }
      })
      .finally(() => {
        setTimeout(() => setIsSuccessRequest(false), 5000);
        setTimeout(() => setIsBadRequest(false), 5000);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("searchText");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("foundMovies");
    localStorage.removeItem("moviesAll");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("filterCheckbox");
    localStorage.removeItem("searchTextSaved");
    localStorage.removeItem("filterCheckboxSaved");
    localStorage.removeItem("savedFoundMovies");

    setLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    setFoundMovies([]);
    setSavedFoundMovies([]);
    setIsWasRequest(false);
    setIsWasSavedRequest(false);
    navigate("/signin");
  }

  function handleFilterMovies(moviesData, keyword, isChecked) {
    const foundResult = moviesData.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    if (isChecked) {
      return foundResult.filter(
        (movie) => movie.duration <= DURATION_SHORT_FILM
      );
    } else {
      return foundResult;
    }
  }

  function handleChangeСheckbox() {
    const valueChecked = !checked;
    setChecked(valueChecked);
    localStorage.setItem("filterCheckbox", valueChecked);
  }

  function handleChangeSavedСheckbox() {
    const valueChecked = !checkedSaved;
    setCheckedSaved(valueChecked);
    localStorage.setItem("filterCheckboxSaved", valueChecked);
  }

  function handleSearchMovies(searchText) {
    setIsLoading(true);
    localStorage.setItem("searchText", searchText);
    if (movies.length === 0) {
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setMovies(movies);
          localStorage.setItem("moviesAll", JSON.stringify(movies));
          const foundMovies = handleFilterMovies(movies, searchText, checked);
          setFoundMovies(foundMovies);
          localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
        })
        .catch((err) => {
          console.log(err);
          setIsBadServerRequest(true);
          setNothingFoundServer(NOTHIHG_FOUND_SERVER);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1500);
        });
    } else {
      const movies = JSON.parse(localStorage.getItem("moviesAll"));
      const foundMovies = handleFilterMovies(movies, searchText, checked);
      setFoundMovies(foundMovies);
      localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
      setTimeout(() => setIsLoading(false), 1500);
    }
    setIsWasRequest(true);
  }

  function handleMovieFavorite(movie) {
    mainApi
      .saveMovie({
        country: movie.country ? movie.country : "Нет данных",
        director: movie.director ? movie.director : "Нет данных",
        duration: movie.duration ? movie.duration : "Нет данных",
        year: movie.year ? movie.year : "Нет данных",
        description: movie.description ? movie.description : "Нет данных",
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU ? movie.nameRU : "Нет данных",
        nameEN: movie.nameEN ? movie.nameEN : movie.nameRU,
      })
      .then((newMovie) => {
        const newSavedMovies = [newMovie, ...savedMovies];
        setSavedMovies(newSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearchSavedMovies(searchText) {
    setIsLoading(true);
    localStorage.setItem("searchTextSaved", searchText);
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const savedFoundMovies = handleFilterMovies(
      savedMovies,
      searchText,
      checkedSaved
    );
    setSavedFoundMovies(savedFoundMovies);
    localStorage.setItem("savedFoundMovies", JSON.stringify(savedFoundMovies));
    setIsWasSavedRequest(true);
    setTimeout(() => setIsLoading(false), 1500);
  }

  function handleMovieDelete(movie) {
    const deleteMovie = movie._id
      ? movie
      : savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    mainApi
      .deleteMovie(deleteMovie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (movie) => movie._id !== deleteMovie._id
        );
        setSavedMovies(newSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
        const newSavedFoundMovies = savedFoundMovies.filter(
          (movie) => movie._id !== deleteMovie._id
        );
        setSavedFoundMovies(newSavedFoundMovies);
        localStorage.setItem(
          "savedFoundMovies",
          JSON.stringify(newSavedFoundMovies)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  movies={foundMovies}
                  savedMovies={savedMovies}
                  onSearchMovies={handleSearchMovies}
                  nothingFoundServer={nothingFoundServer}
                  isBadServerRequest={isBadServerRequest}
                  isWasRequest={isWasRequest}
                  onMovieSave={handleMovieFavorite}
                  onMovieDelete={handleMovieDelete}
                  checked={checked}
                  onChangeСheckbox={handleChangeСheckbox}
                  localStorageTextValue={seachText}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  movies={savedFoundMovies}
                  savedMovies={savedMovies}
                  onSearchMovies={handleSearchSavedMovies}
                  isWasRequest={isWasSavedRequest}
                  onMovieDelete={handleMovieDelete}
                  checked={checkedSaved}
                  onChangeСheckbox={handleChangeSavedСheckbox}
                  localStorageTextValue={seachTextSaved}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  isSuccessRequest={isSuccessRequest}
                  message={message}
                  isBadRequest={isBadRequest}
                  handleLogout={handleLogout}
                  onMovieDelete={handleMovieDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                message={message}
                isBadRequest={isBadRequest}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                message={message}
                isBadRequest={isBadRequest}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
