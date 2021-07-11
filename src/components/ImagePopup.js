import React from "react";
export default ImagePopup;
function ImagePopup({card, isOpen, onClose}) {
  return (
    <div
      className={`popup popup-img ${
        card && isOpen ? "popup__opened" : "popup__hide"
      }`}
    >
      <div className="popup-img__container">
        <button
          className="popup-img__close"
          type="button"
          onClick={onClose}
        />
        <img
          src={card?.link}
          alt={card?.name}
          className="popup-img__image"
        />
        <p className="popup-img__subtitle">
          {card ? card.name : ""}
        </p>
      </div>
    </div>
  );
}
