import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, updateCard }) {
  const { pathname } = useLocation();
  const { nameRU, duration, trailerLink, image, saved } = movie;
  const durationCalc = `${Math.trunc(duration / 60)}ч ${duration % 60}м`;

  return (
    <li className="movie-card">
      <a
        className="movie-card__trailer"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="movie-card__image" src={image.url ? `https://api.nomoreparties.co${image.url}` : image} alt={nameRU} />
      </a>
      <div className="movie-card__description">
        <p className="movie-card__title">{nameRU}</p>
        {pathname === "/movies" ? (
          <button
            className={`movie-card__save-button ${
              saved ? "movie-card__save-button_active" : ""
            }`}
            type="button"
            onClick={() => updateCard(movie)}
          ></button>
        ) : (
          <button
            className="movie-card__delete-button"
            type="button"
            onClick={() => updateCard(movie)}
          ></button>
        )}
      </div>
      <p className="movie-card__duration">{durationCalc}</p>
    </li>
  );
}

export default MoviesCard;
