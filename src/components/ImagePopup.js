import React from "react";
export default ImagePopup;
function ImagePopup(props) {
  return (
    <div className={`popup popup-img ${props.card && props.isOpen ? "popup__opened" : "popup__hide"}`}>
      <div className="popup-img__container">
        <button
          className="popup-img__close"
          type="button"
          onClick={props.onClose}></button>
        <img
          src={props.card?.link}
          alt={ props.card?.name}
          className="popup-img__image"
        />
        <p className="popup-img__subtitle">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
}
