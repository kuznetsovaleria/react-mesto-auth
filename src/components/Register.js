import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Welcome.css";

function Register({ onRegister }) {
  const initialData = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialData);

  // ВНЕСТИ ИЗМЕНЕНИЯ В ИНПУТЫ
  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  // ОБРАБОТКА САБМИТА
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    onRegister(data);
  }

  return (
    <div className="welcome welcome_register">
      <form
        onSubmit={handleSubmit}
        className="welcome__form"
        autoComplete="off"
        noValidate
      >
        <h3 className="welcome__title">Регистрация</h3>
        <input
          id="register-email"
          name="email"
          type="email"
          className="welcome__input"
          placeholder="Email"
          value={data.email}
          onChange={handleInputChange}
          required
        ></input>
        <input
          id="register-password"
          name="password"
          type="password"
          className="welcome__input "
          placeholder="Пароль"
          value={data.password}
          onChange={handleInputChange}
          required
        ></input>
        <button className="welcome__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="welcome__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="welcome__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
