import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";

function SavedMovies({ loggedIn }) {
  const [movies, setMovies] = useState([]); 
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const filter = (cards, { name = "", shorts = false } = {}) => {
    const filteredCards = cards.filter((card) => {
      const isName = card.nameRU.includes(name);
      if (shorts) {
        return card.duration <= 40 && isName;
      }
      return isName;
    });
    setFilteredMovies(filteredCards);
  };

  useEffect(() => {
    setIsLoading(true);
    mainApi.getMovies().then((cards) => {
      setMovies(cards);
      filter(cards);
      setIsLoading(false);
    });
  }, []);

  const updateCard = (mainCard) => {
    mainApi.deleteMovie(mainCard._id).then((newMovies) => {
       moviesApi.deleteMovie(mainCard._id);
      setMovies(newMovies);
      filter(newMovies);
    });
  };



  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
      onSearchMovies={(search) => filter(movies, search)}

      />
      {isLoading && <Preloader />}
      <MoviesCardList
        movies={filteredMovies}
        updateCard={updateCard}
        isFiltered={true}
      />

      <Footer />
    </>
  );
}

export default SavedMovies;
