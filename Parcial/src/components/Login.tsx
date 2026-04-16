import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.code);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        alert("El usuario no existe o los datos son incorrectos.");
      } else {
        alert("Ocurrió un error: " + error.message);
      }
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cuenta creada con éxito");
    } catch (error: any) {
      console.error("Error al registrar:", error.code);
      alert("No se pudo crear la cuenta: " + error.message);
    }
  };

  if (user) {
    return (
      <div style={{ padding: '10px', background: '#e3f2fd', borderRadius: '8px', color: 'black' }}>
        <p>Usuario: <strong>{user.email}</strong></p>
        <button onClick={() => signOut(auth)} style={{ background: '#f86868' }}>Cerrar Sesión</button>
      </div>
    );
  }

  return (
    <div className="login-form">
      <input 
        type="email" 
        placeholder="Tu correo" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Tu contraseña" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />
      <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
        <button onClick={handleLogin} style={{color: "white"}}>Entrar</button>
        <button onClick={handleRegister} style={{ background: '#6c757d', color: "white" }}>Registrarse</button>
      </div>
    </div>
  );
};