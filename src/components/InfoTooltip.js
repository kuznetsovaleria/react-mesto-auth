import closePopupPath from "../images/close-icon.svg";
import registerSuccess from "../images/register-success.svg";
import registerFail from "../images/register-fail.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_info-tooltip ${
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
        <div className="popup__infotooltip">
          <img
            className="popup__infotooltip-img"
            src={props.onSuccess ? registerSuccess : registerFail}
            alt="Ответ регистрации"
          />
          <p className="popup__infotooltip-message">
            {props.onSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
