import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmRemovePopup({
  isOpen,
  onClose,
  onCardConfirmRemovePopup,
  card,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardConfirmRemovePopup(card);
  }
  return (
    <PopupWithForm
      name="remove-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
