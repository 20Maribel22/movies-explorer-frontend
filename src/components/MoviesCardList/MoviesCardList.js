import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { NOTHIHG_FOUND, DURATION_SHORT_FILM } from "../../utils/constants.js";

function MoviesCardList({
  movies,
  savedMovies,
  moviesShow,
  onAddMovies,
  checked,
  isWasRequest,
  nothingFoundServer,
  isBadServerRequest,
  onMovieSave,
  onMovieDelete,
}) {
  const { pathname } = useLocation();
  const [moviesFilter, setMoviesFilter] = React.useState(movies);

  React.useEffect(() => {
    if (checked) {
      const moviesShorts = movies.filter(
        (movie) => movie.duration <= DURATION_SHORT_FILM
      );
      setMoviesFilter(moviesShorts);
    } else {
      setMoviesFilter(movies);
    }
  }, [checked, movies]);

  return (
    <section className="movies-cards">
      {moviesFilter.length > 0 ? (
        <ul className="movies-cards__list">
          {moviesFilter.slice(0, moviesShow).map((movie) => (
            <MoviesCard
              key={movie.id ? movie.id : movie._id}
              movie={movie}
              savedMovies={savedMovies}
              onMovieSave={onMovieSave}
              onMovieDelete={onMovieDelete}
            />
          ))}
        </ul>
      ) : (
        <p
          className={`movies-cards__nothing ${
            isWasRequest ? "" : "movies-cards_nothing_hiddden"
          }`}
        >
          {isBadServerRequest ? nothingFoundServer : NOTHIHG_FOUND}
        </p>
      )}
      {pathname === "/movies" ? (
        <div className="movies-cards__container-button">
          <button
            className={`movies-cards__button ${
              (moviesShow >= moviesFilter.length ||
                moviesShow >= movies.length) &&
              "movies-cards__button_hidden"
            }`}
            type="button"
            onClick={onAddMovies}
          >
            Ещё
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;
