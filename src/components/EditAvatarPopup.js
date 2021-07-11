import React from "react";
import PopupWithForm from "./PopupWithForm";
export default EditAvatarPopup;
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading2 }) {
  const avatarInput = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText={`${isLoading2 ? `Сохранение...` : `Сохранить`}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading2={isLoading2}
    >
      <input
        type="url"
        className="popup-avatar__input-text popup-avatar__input-link"
        id="avatar-input-link"
        name="link"
        placeholder="Ссылка на аватар"
        ref={avatarInput}
        required
      />
      <span className="form-avatar-input-error"> </span>
    </PopupWithForm>
  );
}
