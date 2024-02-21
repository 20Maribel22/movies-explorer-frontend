import "./AboutMe.css";
import foto from "../../images/photo_2024-02-21_14-36-12.jpg";

function AboutMe() {
  return (
    <section id="student" className="about-me">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__description">
          <h3 className="about-me__title">Марина</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 37 лет</p>
          <p className="about-me__text">
            Я родилась и живу в Бишкеке, закончила факультет экологии и энергосбережения КГУСТА. У
            меня есть муж и трое детей. Я люблю слушать музыку, ходить в походы,кататься на велосипеде.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/20Maribel22"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__foto" src={foto} alt="Фото" />
      </div>
    </section>
  );
}

export default AboutMe;
