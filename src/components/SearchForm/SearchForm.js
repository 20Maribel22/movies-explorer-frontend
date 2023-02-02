import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import search from "../../images/find.svg";
import find from "../../images/find-icon.svg";
import useFormValidation from "../../hooks/useFormValidation";

function SearchForm({ onSearchMovies, savedSearch={}   }) {
  const [errorText, setErrorText] = useState("");
  const { values, isValid, handleChange } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSearchMovies(values);
    } else {
      setErrorText("Нужно ввеcти ключевое слово.");
    }
  };

const onChangeСheckbox =(e) => {
  handleChange(e);
}

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
            name="name"
            placeholder="Фильм"
            value={values.name || savedSearch.name || ""}
            onChange={handleChange}
          />
          <button className="search__button" type="subit">
            <img className="search__button-icon" src={search} alt="Поиск" />
          </button>
        </form>
        <FilterCheckbox
          filtercheckbox={values.shorts || savedSearch.shorts || false}
          handleCheckbox={onChangeСheckbox}
        />
      </div>
      <span className="search__input-error">
        {isValid && values.search ? "" : `${errorText}`}
      </span>
      <span className="search__line"></span>
    </section>
  );
}

export default SearchForm;
