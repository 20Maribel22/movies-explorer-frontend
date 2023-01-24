import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ onRegister, isBadRequest, message }) {
  const { pathname } = useLocation();
  const registerButtonClassName = `register__button ${
    pathname === "/signin" ? "register__button_type_login" : ""
  }`;

  const { values, errors, isValid, handleChange } = useFormValidation();

  const { name, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onRegister(name, email, password);
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
          <span className="register__input-error">{errors.name}</span>
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
          <span className="register__input-error">{errors.email}</span>
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
          <span className="register__input-error">{errors.password}</span>
        </label>
        {isBadRequest ? (
          <span className="register__message">{message}</span>
        ) : (
          ""
        )}
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
