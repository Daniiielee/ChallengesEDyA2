import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FileSystemProvider } from './context/FileSystemContext';
import { Login } from './components/Login';
import { FileTreeVisual } from './components/FileTreeVisual';
import './App.css';

const MainContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <header>
        <h1>Archivos</h1>
        <Login />
      </header>

      <main>
        {user ? (
          <FileSystemProvider>
            <FileTreeVisual />
          </FileSystemProvider>
        ) : (
          <div className="welcome-msg">
            <h3>Parcial 2 de estructuras de datos y algoritmos 2</h3>
            <p>Inicia sesion o registrate para acceder al sistema.</p>
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;