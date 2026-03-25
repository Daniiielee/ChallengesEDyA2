import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Usuario: {user}</h2>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Cerrar Sesión</button>
      
      <div>
        <h3>Proyectos</h3>
        <button onClick={() => navigate('/stacks')} style={{ marginRight: '10px' }}>Libreria</button>
        <button onClick={() => navigate('/queues')}>ATM</button>
      </div>
    </div>
  );
};