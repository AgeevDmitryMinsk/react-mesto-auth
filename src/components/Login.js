import React from "react";
import { withRouter } from "react-router-dom";
export default withRouter(Login);
function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={handleSubmit}>
        <h2 className="login-page__title">Вход</h2>
        <input
          className="login-page__inputs"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          value={email}></input>
        <input
          className="login-page__inputs"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="6"
          onChange={handlePasswordChange}
          value={password}></input>
        <button className="login-page__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
