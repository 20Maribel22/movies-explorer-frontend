import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import search from "../../images/find.svg";
import find from "../../images/find-icon.svg";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <img className="search__find-icon" src={find} alt="Поиск" />
          <input
            className="search__input"
            type="text"
            name="search"
            placeholder="Фильм"
          />
          <button className="search__button" type="subit">
            <img className="search__button-icon" src={search} alt="Поиск" />
          </button>
        </form>
        <FilterCheckbox />
      </div>
      <span className="search__line"></span>
    </section>
  );
}

export default SearchForm;
