import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const validation = () => {
    const number = 6;
    const emailRegex = (/\S+@\S+\.\S+/);
    const pass = password.length > number;
    const e = emailRegex.test(email);
    setDisabled(!pass);
    console.log(e);
    console.log(email);
  };
  const renderInput = ({ target }) => {
    validation();
    const { name, value } = target;
    if (name === 'mailInput') {
      setEmail(value);
    } if (name === 'passwordInput') {
      setPassword(value);
    }
    setPassword(target.value);
  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="mailInput"
          data-testid="email-input"
          placeholder="email"
          onChange={ renderInput }
        />
        <input
          type="password"
          name="passwordInput"
          data-testid="password-input"
          placeholder="senha"
          onChange={ renderInput }
        />

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
