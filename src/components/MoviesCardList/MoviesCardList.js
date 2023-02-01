import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  updateCard,
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
        <div className="movies-cards__container-button">
        <button className="movies-cards__button" type="button">
          Ещё
        </button>
      </div>
        </section>)
}

export default MoviesCardList;
