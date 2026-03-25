import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() !== '' && passwordInput.trim() !== '') {
      const success = login(usernameInput, passwordInput);
      if (success) {
        navigate('/home', { replace: true });
      } else {
        alert('Credenciales incorrectas');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario: </label>
          <input 
            type="text" 
            value={usernameInput} 
            onChange={(e) => setUsernameInput(e.target.value)} 
            placeholder="Ingresa tu nombre"
          />
        </div>
        <div>
          <label>Contraseña: </label>
          <input 
            type="password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Ingresar</button>
      </form>
    </div>
  );
};