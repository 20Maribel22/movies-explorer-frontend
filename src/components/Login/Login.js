import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo/logo.svg";

function Login() {
  const { pathname } = useLocation();
  const registerButtonClassName = `register__button ${
    pathname === "/signin" ? "register__button_type_login" : ""
  }`;

  return (
    <section className="register">
      <Link to="/" className="logo-container">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__form" name="register">
        <label className="register__label">
          E-mail
          <input
            className="register__input"
            type="email"
            name="e-mail"
            minLength="2"
            maxLength="40"
            placeholder="e-mail"
            required
          />
          <span className="register__input-error email-input-error"></span>
        </label>
        <label className="register__label">
          Пароль
          <input
            className="register__input"
            type="password"
            name="password"
            placeholder="пароль"
            minLength="8"
            maxLength="200"
            required
          />
        </label>
        <button className={registerButtonClassName} type="submit">
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
