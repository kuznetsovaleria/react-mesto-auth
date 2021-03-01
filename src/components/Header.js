import logoHeader from "../images/logo.svg";
import { Switch, Route, Link } from 'react-router-dom';


function Header({loggedIn, email, onSignOut}) {
  return (
    <header className="header">
      <img
        src={logoHeader}
        alt="логотип проекта Место"
        className="header__logo"
      />
      <nav>
        <ul className="header__nav">
          <Switch>
            <Route path="/sign-up">
            <li className="header__item"><Link to="/sign-in" className="header__link">Войти</Link></li>
            </Route>
            <Route path="/sign-in">
              <li className="header__item"><Link to="/sign-up" className="header__link">Регистрация</Link></li>
            </Route>
            {loggedIn ? <>
            <li className="header__item">{email}</li>
            <li onClick={onSignOut} className="header__link">Выйти</li>
            </> : ''}
          </Switch>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
