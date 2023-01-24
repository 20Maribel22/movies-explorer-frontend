import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import search from "../../images/find.svg";
import find from "../../images/find-icon.svg";
import useFormValidation from "../../hooks/useFormValidation";
import { ENTER_KEYWORD } from "../../utils/constants.js";

function SearchForm({
  onSearchMovies,
  checked,
  onChangeСheckbox,
  localStorageTextValue,
}) {
  const [errorText, setErrorText] = React.useState("");
  const { values, isValid, handleChange } = useFormValidation();
  const inputEl = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSearchMovies(values.search);
    } else {
      setErrorText(ENTER_KEYWORD);
    }
  };

  React.useEffect(() => {
    inputEl.current.value = localStorageTextValue;
  });

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search"
          onSubmit={handleSubmit}
          noValidate
        >
          <img className="search__find-icon" src={find} alt="Поиск" />
          <input
            className="search__input"
            type="text"
            name="search"
            ref={inputEl}
            placeholder="Фильм"
            value={values.search || ""}
            onChange={handleChange}
            required
          />
          <button className="search__button" type="subit">
            <img className="search__button-icon" src={search} alt="Поиск" />
          </button>
        </form>

        <FilterCheckbox checked={checked} handleCheckbox={onChangeСheckbox} />
      </div>
      <span className="search__input-error">
        {isValid && values.search ? "" : `${errorText}`}
      </span>
      <span className="search__line"></span>
    </section>
  );
}

export default SearchForm;
