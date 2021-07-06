import React from "react";
import Card from "./Card";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default Main;
function Main(props) {
  const { onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, cards } = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__section">
        <div className="profile__avatar-container">
          <img
            src={`${currentUser.avatar}`}
            alt="Фото Аватара"
            className="profile__avatar"
          />
          <div className="profile__hover-edit" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__container-info">
          <div className="profile__avatar-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}></button>
      </section>
      <section className="pictures">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
