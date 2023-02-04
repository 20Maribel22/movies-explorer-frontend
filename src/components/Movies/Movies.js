import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import useResizeWindow from "../../hooks/useResizeWindow";

function Movies({ loggedIn }) {
  const size = useResizeWindow();
  const [numberMoviesShow, setNumberMoviesShow] = useState(0);
  const [numberMoviesAdd, setNumberMoviesAdd] = useState(0);

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const savedSearch = JSON.parse(localStorage.getItem("search") || "{}");

  const sizeConstant = {
    large: {
      width: 1024,
      moviesShow: 12,
      moviesAdd: 4,
    },
    medium: {
      width: 800,
      moviesShow: 9,
      moviesAdd: 3,
    },
    small: {
      width: 600,
      moviesShow: 8,
      moviesAdd: 2,
    },
    smallest: {
      width: 450,
      moviesShow: 5,
      moviesAdd: 2,
    },
  };

  useEffect(() => {
    if (size.width >= sizeConstant.large.width) {
      setNumberMoviesShow(sizeConstant.large.moviesShow);
      setNumberMoviesAdd(sizeConstant.large.moviesAdd);
    } else if (size.width >= sizeConstant.medium.width) {
      setNumberMoviesShow(sizeConstant.medium.moviesShow);
      setNumberMoviesAdd(sizeConstant.medium.moviesAdd);
    } else if (size.width >= sizeConstant.small.width) {
      setNumberMoviesShow(sizeConstant.small.moviesShow);
      setNumberMoviesAdd(sizeConstant.small.moviesAdd);
    } else {
      setNumberMoviesShow(sizeConstant.smallest.moviesShow);
      setNumberMoviesAdd(sizeConstant.smallest.moviesAdd);
    }
  }, [size.width]);

  const handleMoviesAdd = () => {
    console.log(numberMoviesShow, numberMoviesAdd);
    setNumberMoviesShow(numberMoviesShow + numberMoviesAdd);
  };

  const filter = (cards, { name = "", shorts = false } = {}) => {
    localStorage.setItem("search", JSON.stringify({ name, shorts }));
    setIsFiltered(true);
    const filteredCards = cards.filter((card) => {
      const isName = card.nameRU.toLowerCase().includes(name.toLowerCase());
      if (shorts) {
        return card.duration <= 40 && isName;
      }
      return isName;
    });
    setFilteredMovies(filteredCards);
  };

  useEffect(() => {
    setIsLoading(true);
    moviesApi.getAllMovies().then((cards) => {
      setMovies(cards);
      filter(cards, savedSearch);
      setIsLoading(false);
    });
  }, []);

  const saveCard = (beatCard) => {
    const newCard = {
      country: beatCard.country,
      director: beatCard.director,
      duration: beatCard.duration,
      year: beatCard.year,
      description: beatCard.description,
      image: `https://api.nomoreparties.co${beatCard.image.url}`,
      trailerLink: beatCard.trailerLink,
      nameRU: beatCard.nameRU,
      nameEN: beatCard.nameEN,
      thumbnail: `https://api.nomoreparties.co${beatCard.image.formats.thumbnail.url}`,
      movieId: beatCard.id,
    };

    mainApi.saveMovie(newCard).then((savedCard) => {
      const newMovies = moviesApi.saveMovie(savedCard);
      setMovies(newMovies);
      filter(newMovies);
    });
  };

  const deleteCard = (mainCard) => {
    mainApi.deleteMovie(mainCard._id).then(() => {
      const newMovies = moviesApi.deleteMovie(mainCard._id);
      setMovies(newMovies);
      filter(newMovies);
    });
  };

  const updateCard = (card) => (card.saved ? deleteCard(card) : saveCard(card));

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        savedSearch={savedSearch}
        onSearchMovies={(search) => filter(movies, search)}
      />
      {isLoading && <Preloader />}

      <MoviesCardList
        movies={filteredMovies.filter((c, i) => i < numberMoviesShow)}
        hasLoad={filteredMovies.length >= numberMoviesShow}
        updateCard={updateCard}
        handleMoviesAdd={handleMoviesAdd}
        isFiltered={isFiltered}
        numberMoviesShow={numberMoviesShow}
      />

      <Footer />
    </>
  );
}

export default Movies;
