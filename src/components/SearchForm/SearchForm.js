import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import search from "../../images/find.svg";
import find from "../../images/find-icon.svg";
import useFormValidation from "../../hooks/useFormValidation";

function SearchForm({ onSearchMovies, savedSearch = {} }) {
  const [errorText, setErrorText] = useState("");
  const { values, isValid, handleChange,resetForm } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSearchMovies(values);
      setErrorText('')
    } else {
      setErrorText("Нужно ввеcти ключевое слово.");
    }
  };



  const onChangeСheckbox = (e) => {
  
    handleChange(e);
    onSearchMovies({
      ...values,
      shorts:e.target.checked
    })
  };

  useEffect(()=> {
  resetForm(savedSearch)
  },[])

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
            minLength={2}
            required
            value={values.name || ""}
            onChange={handleChange}
          />
          <button className="search__button" type="subit">
            <img className="search__button-icon" src={search} alt="Поиск" />
          </button>
        </form>
        <FilterCheckbox
          filtercheckbox={values.shorts || false}
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
