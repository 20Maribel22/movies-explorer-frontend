import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ handleRegister, statusRegister }) {
  const { pathname } = useLocation();
  const registerButtonClassName = `register__button ${
    pathname === "/signin" ? "register__button_type_login" : ""
  }`;

  const [isMessage, setIsMessage] = useState("");

  function handleMessage() {
    if (statusRegister) {
      switch (statusRegister) {
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
  }, [statusRegister]);

  const { values, errors, isValid, handleChange } = useFormValidation();

  const { name, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      handleRegister(name, email, password);
    }
  }

  return (
    <section className="register">
      <Link to="/" className="logo-container">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" name="register" onSubmit={handleSubmit}>
        <label className="register__label">
          Имя
          <input
            className={`register__input ${
              errors.name && "register__input_invalid"
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
          <span className="register__input-error name-input-error">
            {errors.name}
          </span>
        </label>
        <label className="register__label">
          E-mail
          <input
            className={`register__input ${
              errors.email && "register__input_invalid"
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
          <span className="register__input-error email-input-error">
            {errors.email}
          </span>
        </label>
        <label className="register__label">
          Пароль
          <input
            className={`register__input ${
              errors.password && "register__input_invalid"
            }`}
            type="password"
            name="password"
            placeholder="пароль"
            minLength="8"
            maxLength="200"
            required
            value={password || ""}
            onChange={handleChange}
          />
          <span className="register__input-error">{errors.password}</span>
        </label>
        <span className="register__message">{isMessage}</span>
        <button
          className={registerButtonClassName}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__container">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
