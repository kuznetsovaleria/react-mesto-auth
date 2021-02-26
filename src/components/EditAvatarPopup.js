import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="link-avatar"
        type="url"
        name="avatar-link"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_link"
        required
      />
      <span id="link-avatar-error" className="error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
