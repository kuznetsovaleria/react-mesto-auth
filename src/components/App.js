import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import api from "../api/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../auth/auth";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoToolPopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // ОБРАБОТКА РЕГИСТРАЦИИ
  function handleRegister({ email, password }) {
    return auth
      .register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          console.log("Что-то пошло не так");
        } else {
          setRegisterSuccess(true);
          setIsInfoToolPopupOpen(true);
          history.push("/sign-in");
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoToolPopupOpen(true);
      });
  }

  // ОБРАБОТКА ЛОГИНА
  function handleLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          console.log("Что-то пошло не так");
        }
        if (res.token) {
          setLoggedIn(true);
          setEmail(email);
          localStorage.setItem("token", res.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ПРОВЕРКА ТОКЕНА
  const tokenCheck = React.useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
          }
          history.push("/");
        })
        .catch(() => history.push("/sign-in"));
    }
  }, [history]);

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  // ВЫХОД
  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  // ЗАГРУЗКА КАРТОЧЕК И ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //ОТКРЫТЬ РЕДАКТИРОВАНИЕ АВАТАРА
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // РЕДАКТИРОВАНИЕ АВАТАРА
  function handleUpdateAvatar(userAvatar) {
    api
      .changeUserAvatar({ link: userAvatar.avatar })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ОТКРЫТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ОТКРЫТЬ ДОБАВЛЕНИЕ КАРТОЧКИ С МЕСТОМ
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // ДОБАВИТЬ КАРТОЧКУ
  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ЛАЙК/ДИЗЛАЙК
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const likeRequest = !isLiked
      ? api.putLike(card._id)
      : api.removeLike(card._id);

    likeRequest
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // УДАЛЕНИЕ КАРТОЧКИ
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ОТКРЫТЬ КАРТИНКУ
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // ЗАКРЫТЬ ПОПАПЫ
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolPopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={handleLogin} tokenCheck={tokenCheck} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onSuccess={registerSuccess}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete-place"
          isOpen={false}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
