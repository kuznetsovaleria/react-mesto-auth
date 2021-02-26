import closePopupPath from "../images/close-icon.svg";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup-photo ${props.isOpen ? "popup_opened" : ""}`}
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
            onClick={props.onClose}
          />
        </button>
        <img
          src={props.card ? props.card.link : "#"}
          alt={props.card.name}
          className="popup-photo__img"
        />
        <p className="popup-photo__caption">{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
