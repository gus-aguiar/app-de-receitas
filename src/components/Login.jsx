import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Header from './Header';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const validation = () => {
    const number = 6;
    const emailRegex = (/\S+@\S+\.\S+/);
    const pass = password.length > number && emailRegex.test(email);
    setDisabled(!pass);
  };

  useEffect(() => {
    validation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>
      {/* <Header title="login" /> */}
      <form className="loginForm">
        <input
          className="loginInput"
          type="email"
          name="mailInput"
          data-testid="email-input"
          placeholder="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <input
          className="loginInput"
          type="password"
          name="passwordInput"
          data-testid="password-input"
          placeholder="senha"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />

        <button
          className="loginBtn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
