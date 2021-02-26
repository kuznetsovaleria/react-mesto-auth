import logoHeader from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={logoHeader}
        alt="логотип проекта Место"
        className="header__logo"
      />
    </header>
  );
}

export default Header;
