import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
  loggedIn,
  isLoading,
  movies,
  savedMovies,
  onSearchMovies,
  isWasRequest,
  onMovieDelete,
  checked,
  onChangeСheckbox,
  localStorageTextValue,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm
          localStorageTextValue={localStorageTextValue}
          onSearchMovies={onSearchMovies}
          checked={checked}
          onChangeСheckbox={onChangeСheckbox}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            checked={checked}
            isWasRequest={isWasRequest}
            onMovieDelete={onMovieDelete}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
