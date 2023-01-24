import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";

function Profile({
  loggedIn,
  onUpdateUser,
  isSuccessRequest,
  isBadRequest,
  message,
  handleLogout,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isUserInfo, setIsUserInfo] = React.useState(false);
  const { values, errors, isValid, handleChange, resetFrom } =
    useFormValidation();
  const { name = currentUser.data.name, email = currentUser.data.email } =
    values;

  React.useEffect(() => {
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
            <span className="profile__input-error">{errors.name}</span>
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
            <span className="profile__input-error">{errors.email}</span>
          </label>
          {isSuccessRequest || isBadRequest ? (
            <span className="profile__edit-message">{message}</span>
          ) : (
            ""
          )}
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
