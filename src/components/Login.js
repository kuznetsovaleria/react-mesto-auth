import React, { useState } from "react";
import "./styles/Welcome.css";

function Login({ onLogin }) {
  const initialData = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialData);

  // ОБРАБОТКА ИЗМЕНЕНИЙ В ИНПУТАХ
  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  // ОЧИТСКА ФОРМЫ
  function resetForm() {
    setData(initialData);
  }

  // ОБРАБОТКА САБМИТА
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    onLogin(data)
    resetForm();
  }

  return (
    <div className="welcome">
      <form
        onSubmit={handleSubmit}
        className="welcome__form"
        autoComplete="off"
        noValidate
      >
        <h3 className="welcome__title">Вход</h3>
        <input
          id="login-email"
          name="email"
          type="email"
          className="welcome__input"
          placeholder="Email"
          value={data.email}
          onChange={handleInputChange}
          required
        ></input>
        <input
          id="login-password"
          name="password"
          type="password"
          className="welcome__input"
          placeholder="Пароль"
          value={data.password}
          onChange={handleInputChange}
          required
        ></input>
        <button className="welcome__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
