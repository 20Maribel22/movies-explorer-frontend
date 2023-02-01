import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";

function SavedMovies({ loggedIn, updateCard }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filter = (cards ,{name = '', shorts = false}={}) => {
   const filteredCards = cards.filter((card) => {
    const isName = card.nameRU.includes(name)
    if(shorts) {

      return card.duration <= 40 && isName;
    }
    return isName;
   })
   setFilteredMovies(filteredCards);
  }

  useEffect(() => {
    setIsLoading(true);
    mainApi.getMovies().then((cards) => {
      setMovies(cards);
      filter(cards);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        movies={filteredMovies}
        updateCard={updateCard}
      />

      <Footer />
    </>
  );
}

export default SavedMovies;
