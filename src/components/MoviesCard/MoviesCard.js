import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, savedMovies, onMovieSave, onMovieDelete }) {
  const { pathname } = useLocation();
  const { nameRU, duration, image, trailerLink } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
  const isSaved = savedMovies.some((item) => item.movieId === movie.id);

  const handleFavoriteClick = () => {
    onMovieSave(movie);
  };

  function handleDeleteClick() {
    onMovieDelete(movie);
  }

  return (
    <li className="movie-card">
      <a
        className="movie-card__trailer"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={image.url ? `https://api.nomoreparties.co${image.url}` : image}
          alt={nameRU}
        />
      </a>
      <div className="movie-card__description">
        <p className="movie-card__title">{nameRU}</p>
        {pathname === "/movies" ? (
          <button
            className={`movie-card__save-button ${
              isSaved ? "movie-card__save-button_active" : ""
            }`}
            type="button"
            onClick={isSaved ? handleDeleteClick : handleFavoriteClick}
          ></button>
        ) : (
          <button
            className="movie-card__delete-button"
            type="button"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
      <p className="movie-card__duration">{durationCalc}</p>
    </li>
  );
}

export default MoviesCard;
