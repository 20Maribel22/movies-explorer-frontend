import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import useResizeWindow from "../../hooks/useResizeWindow";
import {
  LARGE_SCREEN_WIDTH,
  LARGE_SCREEN_WIDTH_SHOW,
  LARGE_SCREEN_WIDTH_ADD,
  MEDIUM_SCREEN_WIDTH,
  MEDIUM_SCREEN_WIDTH_SHOW,
  MEDIUM_SCREEN_WIDTH_ADD,
  SMALL_SCREEN_WIDTH,
  SMALL_SCREEN_WIDTH_SHOW,
  SMALL_SCREEN_WIDTH_ADD,
  SMALLEST_SCREEN_WIDTH_SHOW,
} from "../../utils/constants.js";

function Movies({
  loggedIn,
  isLoading,
  movies,
  savedMovies,
  onSearchMovies,
  nothingFoundServer,
  isBadServerRequest,
  isWasRequest,
  onMovieSave,
  onMovieDelete,
  checked,
  onChangeСheckbox,
  localStorageTextValue,
}) {
  const size = useResizeWindow();
  const [moviesShow, setMoviesShow] = React.useState(0);
  const [moviesAdd, setMoviesAdd] = React.useState(0);

  React.useEffect(() => {
    if (size > LARGE_SCREEN_WIDTH) {
      setMoviesShow(LARGE_SCREEN_WIDTH_SHOW);
      setMoviesAdd(LARGE_SCREEN_WIDTH_ADD);
    } else if (size > MEDIUM_SCREEN_WIDTH) {
      setMoviesShow(MEDIUM_SCREEN_WIDTH_SHOW);
      setMoviesAdd(MEDIUM_SCREEN_WIDTH_ADD);
    } else if (size > SMALL_SCREEN_WIDTH) {
      setMoviesShow(SMALL_SCREEN_WIDTH_SHOW);
      setMoviesAdd(SMALL_SCREEN_WIDTH_ADD);
    } else {
      setMoviesShow(SMALLEST_SCREEN_WIDTH_SHOW);
      setMoviesAdd(SMALL_SCREEN_WIDTH_ADD);
    }
  }, [size]);

  function handleAddMovies() {
    setMoviesShow(moviesShow + moviesAdd);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm
          onSearchMovies={onSearchMovies}
          checked={checked}
          onChangeСheckbox={onChangeСheckbox}
          localStorageTextValue={localStorageTextValue}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            moviesShow={moviesShow}
            onAddMovies={handleAddMovies}
            checked={checked}
            isBadServerRequest={isBadServerRequest}
            nothingFoundServer={nothingFoundServer}
            isWasRequest={isWasRequest}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
