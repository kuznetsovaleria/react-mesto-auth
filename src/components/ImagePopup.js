import closePopupPath from "../images/close-icon.svg";
import React from "react";
import { ESC_CODE } from "../utils/constants.js";

function ImagePopup({ isOpen, onClose, card }) {
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
    <section
      className={`popup popup-photo ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="popup-photo__container">
        <button
          className="popup-photo__close popup__close"
          aria-label="Закрыть"
        >
          <img
            src={closePopupPath}
            alt="Закрыть"
            className="popup__icon"
            onClick={onClose}
          />
        </button>
        <img
          src={card ? card.link : "#"}
          alt={card.name}
          className="popup-photo__img"
        />
        <p className="popup-photo__caption">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
