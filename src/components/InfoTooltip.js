import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";
export default InfoTooltip;
function InfoTooltip(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup__opened" : ""}`}>
      <div className="popup__condition-container">
        <img
          className="popup__condition-image"
          src={props.status ? success : fail}
          alt={props.status ? "Успешно" : "Ошибка"}
        />
        <p className="popup__condition-text">
          {props.status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button
          className="popup__close"
          type="reset"
          onClick={props.onClose}></button>
      </div>
    </div>
  );
}
