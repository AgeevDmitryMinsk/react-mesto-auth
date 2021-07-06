import React from "react";
import PopupWithForm from "./PopupWithForm";
export default AddPlacePopup;
function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading2 }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  React.useEffect(_ => {
    setName('');
    setLink('');
  }, [isOpen]);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="photo"
      buttonText={`${isLoading2 ? `Сохранение...` : `Сохранить`}`}
      isLoading2={isLoading2}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}>
      <input
        type="text"
        className="popup-creat__input-text popup-creat__input-name"
        id="input-name"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
        value={name}
      />
      <span className="popup__input-error"></span>
      {/* <label className="popup-creat__label" for="input-link"></label> */}
      <input
        type="url"
        className="popup-creat__input-text popup-creat__input-link"
        id="input-link"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link}
        required
      />
      <span className="popup__input-error"></span>
    </PopupWithForm>
  );
}
