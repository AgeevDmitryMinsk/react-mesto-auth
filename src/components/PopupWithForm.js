import React from "react";
export default PopupWithForm;
function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup__opened"
      }`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}></button>

        <form
          className={`popup__form form_type_${props.name}`}
          name={props.name}
          onSubmit={props.handleSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
