import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete" : "card__delete_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : "card__like"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card" key={props.card_id}>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__photo"
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <div className="card__group">
        <h2 className="card__place">{props.card.name}</h2>
        <div className="card__likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="card__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
