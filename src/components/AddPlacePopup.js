import React from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('')

    function handlePlaceNameAdd(evt) {
        setPlaceName(evt.target.value);
    }

    function handlePlaceLinkAdd(evt) {
        setPlaceLink(evt.target.value);
    }

    function handleResetInputs() {
      setPlaceName('');
      setPlaceLink('');
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name: placeName,
            link: placeLink,
        })
        handleResetInputs()
    }

    return (
        <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          value={placeName || ''}
          onChange={handlePlaceNameAdd}
          id="place-input"
          minLength="2"
          maxLength="30"
          type="text"
          name="place-name"
          placeholder="Название"
          className="popup__input popup__input_place"
          required
        />
        <span id="place-input-error" className="error" />
        <input
          value={placeLink || ''}
          onChange={handlePlaceLinkAdd}
          id="link-input"
          type="url"
          name="img-link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_link"
          required
        />
        <span id="link-input-error" className="error" />
      </PopupWithForm>
    )
}

export default AddPlacePopup;