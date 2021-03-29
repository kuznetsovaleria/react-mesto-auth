import React from "react";
import Card from "../components/Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Preloader from "./Preloader";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  isCardsLoading,
  isCardsError
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="profile__avatar"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            aria-label="Открыть"
            onClick={onEditProfile}
          ></button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards page__cards">
        {isCardsLoading && (
        <Preloader />
        )}

        {isCardsError && (
        <p className="cards__loading">isCardsError</p>
        )}

        {!isCardsLoading && !isCardsError && (
            <div className="cards">
              {cards.map((card) => {
                return (
                  <Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                  />
                );
              })}
            </div>
          )}
      </section>
      {/* <section className="cards page__cards">
        {isCardsLoading || isCardsError ? (
          <p className="cards__loading">
            {isCardsLoading ? "Загрузка..." : isCardsError}
          </p>
        ) : (
          <div className="cards">
            {cards.map((card) => {
              return (
                <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
              )
            })}
          </div>
        )}
      </section> */}

      {/* <section className="cards page__cards">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section> */}
    </main>
  );
}

export default Main;
