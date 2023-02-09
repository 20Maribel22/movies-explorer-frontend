import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  updateCard,
  handleMoviesAdd,
  isFiltered,
  hasLoad,
}) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id ? movie.id : movie._id}
            movie={movie}
            updateCard={updateCard}
          />
        ))}
      </ul>
      {hasLoad && (
        <div className="movies-cards__container-button">
          <button
            className="movies-cards__button"
            type="button"
            onClick={handleMoviesAdd}
          >
            Ещё
          </button>
        </div>
      )}
      {movies.length === 0 && isFiltered && <span className="movies-cards__nothing"> Ничего не найдено.</span>}
    </section>
  );
}

export default MoviesCardList;
