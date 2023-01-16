import "./Profile.css";
import Header from "../Header/Header";

function Profile({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form" name="profile">
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              placeholder="имя"
              required
            />
            <span className="profile__input-error name-input-error"></span>
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              type="email"
              name="e-mail"
              minLength="2"
              maxLength="40"
              placeholder="e-mail"
              required
            />
            <span className="profile__input-error email-input-error"></span>
          </label>
        </form>
        <button className="profile__submit-button" type="submit">
          Редактировать
        </button>
        <button className="profile__exit-button" type="button">
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
