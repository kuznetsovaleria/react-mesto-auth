import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const { values, handleChange, setValues } = useForm();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={values.name || ""}
        onChange={handleChange}
        id="name-input"
        className="popup__input popup__input_name"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
      />
      <span id="name-input-error" className="error" />
      <input
        value={values.about|| ""}
        onChange={handleChange}
        id="profession-input"
        type="text"
        name="about"
        className="popup__input popup__input_profession"
        minLength="2"
        maxLength="200"
        placeholder="Занятие"
        required
      />
      <span id="profession-input-error" className="error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
