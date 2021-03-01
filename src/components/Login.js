import React, { useState } from 'react';
import { useHistory} from 'react-router-dom'
import './styles/Welcome.css'


function Login({ onLogin} ) {
    const initialData = {
        email: '',
        password: ''
    }
    const [data, setData] = useState(initialData);
    const [message, setMessage] = useState('');
    const history = useHistory();

    // ОБРАБОТКА ИЗМЕНЕНИЙ В ИНПУТАХ
    function handleInputChange(evt) {
        const {name, value} = evt.target;
        setData(data => ({
            ...data,
            [name] : value,
        }))
    }

    // ОЧИТСКА ФОРМЫ
    function resetForm() {
        setData(initialData);
        setMessage('')
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!data.email || !data.password) {
            return;
        }
        onLogin(data)
        .then(resetForm)
        .then(() => history.push('/'))
        .catch(err => setMessage(err.message || 'Что-то пошло не так'))
    }


    return (
      <div className="welcome">
        <form onSubmit={handleSubmit} className="welcome__form">
          <h3 className="welcome__title">Вход</h3>
          <p className="welcome__error">{message}</p>
          <input
            id="login-email"
            name="email"
            type="email"
            className="welcome__input"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
          ></input>
          <input
            id="login-password"
            name="password"
            type="password"
            className="welcome__input"
            placeholder="Пароль"
            value={data.password}
            onChange={handleInputChange}
          ></input>
          <button
            className="welcome__button"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  export default Login;