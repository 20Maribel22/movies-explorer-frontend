import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";

function Profile({ loggedIn, onUpdateUser, statusUser, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [isUserInfo, setIsUserInfo] = useState(false);

  const { values, errors, isValid, handleChange, resetFrom } =
    useFormValidation();
  const { name = currentUser.data.name, email = currentUser.data.email } =
    values;

  const [isMessage, setIsMessage] = useState("");

  useEffect(() => {
    setIsUserInfo(
      name === currentUser.data.name && email === currentUser.data.email
    );
  }, [name, email, currentUser.data.name, currentUser.data.email]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateUser(name, email);
      resetFrom();
    }
  }

  function handleMessage() {
    if (statusUser) {
      switch (statusUser) {
        case 200:
          setIsMessage("Данные обновлены");
          break;
        case 409:
          setIsMessage("Пользователь с такими данными уже существует");
          break;
        case 500:
          setIsMessage("Ошибка на сервере.");
          break;
        default:
          setIsMessage("Произошла ошибка. Попробуйте позже");
          break;
      }
    }
  }

  useEffect(() => {
    handleMessage();
  }, [statusUser]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {name}!</h2>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              className={`profile__input ${
                errors.name && "profile__input_invalid"
              }`}
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              placeholder="имя"
              value={name || ""}
              onChange={handleChange}
              required
            />
            <span className="name-input-error">{errors.name}</span>
          </label>
          <label className="profile__label">
            E-mail
            <input
              className={`profile__input ${
                errors.email && "profile__input_invalid"
              }`}
              type="email"
              name="email"
              minLength="2"
              maxLength="40"
              placeholder="e-mail"
              value={email || ""}
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              onChange={handleChange}
              required
            />
            <span className="profile__input-error email-input-error">
              {errors.email}
            </span>
          </label>
          <span className="profile__edit-message">{isMessage}</span>

          <button
            className="profile__submit-button"
            type="submit"
            disabled={!isValid || isUserInfo}
          >
            Редактировать
          </button>
        </form>
        <button
          className="profile__exit-button"
          type="button"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
