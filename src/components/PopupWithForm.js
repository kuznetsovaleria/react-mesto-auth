import closePopupPath from "../images/close-icon.svg";

function PopupWithForm(props) {
  return (
    <div>
      <section
        className={`popup popup_${props.name} ${
          props.isOpen ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <button className="popup__close" aria-label="Закрыть">
            <img
              src={closePopupPath}
              alt="Закрыть"
              className="popup__icon"
              onClick={props.onClose}
            />
          </button>
          <form
            className="popup__form"
            name={`${props.name}`}
            onSubmit={props.onSubmit}
            noValidate
          >
            <h3 className="popup__title">{`${props.title}`}</h3>
            {props.children}
            <button type="submit" className="popup__submit">
              Сохранить
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PopupWithForm;
