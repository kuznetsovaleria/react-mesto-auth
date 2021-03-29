import closePopupPath from "../images/close-icon.svg";
import React from "react";
import { ESC_CODE } from "../utils/constants.js";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText = "Сохранить",
  children,
  isDisabled = false,
}) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (evt) => {
      if (evt.keyCode === ESC_CODE) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <div>
      <section
        className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
        onMouseDown={handleOverlayClose}
      >
        <div className="popup__container">
          <button className="popup__close" aria-label="Закрыть">
            <img
              src={closePopupPath}
              alt="Закрыть"
              className="popup__icon"
              onClick={onClose}
            />
          </button>
          <form
            className="popup__form"
            name={`${name}`}
            onSubmit={onSubmit}
            noValidate
          >
            <h3 className="popup__title">{`${title}`}</h3>
            {children}
            <button
              type="submit"
              className={`popup__submit ${
                isDisabled && "popup__submit_inactive"
              }`}
              disabled={isDisabled}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PopupWithForm;
