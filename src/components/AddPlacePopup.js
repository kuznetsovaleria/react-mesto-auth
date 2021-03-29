import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {

  const {values, errors, isValid, handleChange, resetForm} = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])


    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace(values);
    }

    return (
        <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isDisabled={!isValid}
      >
        <input
          value={values.name || ''}
          onChange={handleChange}
          id="place-input"
          minLength="2"
          maxLength="30"
          type="text"
          name="name"
          placeholder="Название"
          className="popup__input popup__input_place"
          required
        />
        <span id="place-input-error" className="error">
        {errors.name || ""}
        </span>
        <input
          value={values.link || ''}
          onChange={handleChange}
          id="link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_link"
          required
        />
        <span id="link-input-error" className="error">
        {errors.link || ""}
        </span>
      </PopupWithForm>
    )
}

export default AddPlacePopup;