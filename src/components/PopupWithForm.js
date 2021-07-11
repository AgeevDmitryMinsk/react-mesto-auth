import React from "react";
export default PopupWithForm;
function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  children,
  buttonText,
  isLoading2,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup__opened"}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />

        <form
          className={`popup__form form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
