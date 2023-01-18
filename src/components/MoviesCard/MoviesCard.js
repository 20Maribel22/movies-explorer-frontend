import "./MoviesCard.css";
import movie from "../../images/movie.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function MoviesCard() {
  const { pathname } = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const movieCardButtonClassName = `${
    pathname === "/movies"
      ? `movie-card__save-button ${
          isSaved ? "movie-card__save-button_active" : ""
        }`
      : "movie-card__delete-button"
  }`;

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <li className="movie-card">
      <img className="movie-card__image" src={movie} alt="Фото фильма" />
      <div className="movie-card__description">
        <p className="movie-card__title">33 слова о дизайне</p>
        <button
          className={movieCardButtonClassName}
          type="button"
          onClick={handleSaveClick}
        ></button>
      </div>
      <p className="movie-card__duration">1ч42м</p>
    </li>
  );
}

export default MoviesCard;
