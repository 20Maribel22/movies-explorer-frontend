import React from "react";
import "./Promo.css";
import landing_logo from "../../images/logo/landing-logo.svg"

function Promo() {
  return (
    <div className="promo">
      <img className="promo__logo" src={landing_logo} alt="Логотип" />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </div>
  );
}

export default Promo;
