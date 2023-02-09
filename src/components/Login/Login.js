import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Login({ handleLogin, statusLogin }) {
  const { pathname } = useLocation();
  const registerButtonClassName = `register__button ${
    pathname === "/signin" ? "register__button_type_login" : ""
  }`;

  const [isMessage, setIsMessage] = useState("");

  function handleMessage() {
    if (statusLogin) {
      switch (statusLogin) {
        case 400:
        case 401:
          setIsMessage("Неправильный логин или пароль");
          break;
        case 500:
          setIsMessage("Ошибка на сервере.");
          break;
        default:
          setIsMessage(
            "Произошла ошибка. Попробуйте позже"
          );
          break;
      }
    }
  }

  useEffect(() => {
    handleMessage();
  }, [statusLogin]);

  const { values, errors, isValid, handleChange } = useFormValidation();

  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      handleLogin(email, password);
    }
  }

  return (
    <section className="register">
      <Link to="/" className="logo-container">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__form" name="register" onSubmit={handleSubmit}>
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
            value={password || ""}
            onChange={handleChange}
            required
          />
          <span className="register__input-error password-input-error">
            {errors.password}
          </span>
        </label>
        <span className="register__message">{isMessage}</span>
        <button
          className={registerButtonClassName}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
      <div className="register__container">
        <p className="register__text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="register__link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
