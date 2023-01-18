import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, isMainHeader }) {
  return (
    <header className={`header ${isMainHeader ? "header_type_main" : ""}`}>
      <Link to="/" className="logo-container">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      {loggedIn ? (
        <Navigation />
      ) : (
        <nav>
          <ul className="header__list">
            <li><Link to="/signup" className="header__link header__link_type_register">Регистрация</Link></li>
            <li><Link to="/signin" className="header__link header__link_type_login">Войти</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
