import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles/Welcome.css'


function Register( {onRegister} ) {
    const initialData = {
        email: '',
        password: ''
    };

    const [data, setData] = useState(initialData);
    const [message, setMessage] = useState('');
    const history = useHistory();

    // ВНЕСТИ ИЗМЕНЕНИЯ В ИНПУТЫ
    function handleInputChange(evt) {
        const { name, value } = evt.target;
        setData(data => ({
          ...data,
          [name]: value,
        }));
      }

    // ОЧИСТКА ФОРМЫ
    function resetForm() {
        setData(initialData);
        setMessage('')
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!data.email || !data.password) {
            return
        }
        onRegister(data)
        .then(resetForm)
        .then(() => history.push('/sign-in'))
        .catch(err => setMessage(err.message || 'Что-то пошло не так'))
    }

  return (
    <div className="welcome welcome_register">
      <form onSubmit={handleSubmit} className="welcome__form">
        <h3 className="welcome__title">Регистрация</h3>
        <p className="welcome__error">{message}</p>
        <input
          id="register-email"
          name="email"
          type="email"
          className="welcome__input"
          placeholder="Email"
          value={data.email}
          onChange={handleInputChange}
        ></input>
        <input
          id="register-password"
          name="password"
          type="password"
          className="welcome__input "
          placeholder="Пароль"
          value={data.password}
          onChange={handleInputChange}
        ></input>
        <button
          className="welcome__button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="welcome__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="welcome__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;