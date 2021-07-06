import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default Card;
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `cards__bin ${
    isOwn ? "cards__bin-delete" : "cards__bin_hide"
  }`;

  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `cards__heart ${
    isLiked ? "cards__heart_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }
  return (
    <div className="template">
      <article className="cards">
        <img
          src={card.link}
          alt={card.name}
          className="cards__image"
          onClick={handleClick}
        />
        <div className="cards__info">
          <h2 className="cards__title">{card.name}</h2>
          <div className="cards__likes-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}></button>
            <span className="cards__likes">{card.likes.length}</span>
          </div>
          <button
            className={cardDeleteButtonClassName}
            type="button"
            onClick={handleCardDelete}></button>
        </div>
      </article>
    </div>
  );
}