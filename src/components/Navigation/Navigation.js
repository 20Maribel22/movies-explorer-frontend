import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";
import icon_profile from "../../images/icon__profile.svg";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`navigation ${isOpen ? "navigation__background" : ""}`}>
        <nav className="navigation__container">
          <ul
            className={`navigation__list ${
              isOpen ? "navigation__list-sidebar" : ""
            }`}
          >
            <li
              className={`navigation__link-container navigation__link-container-sidebar ${
                isOpen ? "navigation__link-container-sidebar_active" : ""
              }`}
            >
              <NavLink
                className={({ isActive }) => `navigation__link
              ${isActive && " navigation__link_active"}`}
                exact
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li className="navigation__link-container">
              <NavLink
                className={({ isActive }) => `navigation__link
               ${isActive && " navigation__link_active"}`}
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__link-container">
              <NavLink
                className={({ isActive }) => `navigation__link
                 ${isActive && " navigation__link_active"}`}
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navigation__link-container">
        <Link
          to="/profile"
          className={`navigation__link_type_account ${
            isOpen ? "navigation__link_type_account-sidebar" : ""
          }`}
        >
          <img
            className="navigation__link-icon_profile"
            src={icon_profile}
            alt="Иконка"
          />
          <p className="navigation__link-text_profile">Аккаунт</p>
        </Link>
      </div>
      <button
        className={`navigation__sidebar-close-icon ${
          isOpen ? "navigation__sidebar-close-icon_active" : ""
        }`}
        type="button"
        onClick={handleOpenClick}
      ></button>
      <button
        className="navigation__sidebar-image"
        type="button"
        onClick={handleOpenClick}
      ></button>
    </>
  );
}

export default Navigation;
