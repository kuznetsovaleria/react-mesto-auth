import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        onChange={handleNameChange}
        id="name-input"
        className="popup__input popup__input_name"
        type="text"
        name="edit-name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
      />
      <span id="name-input-error" className="error" />
      <input
        value={description || ""}
        onChange={handleDescriptionChange}
        id="profession-input"
        type="text"
        name="edit-profession"
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
