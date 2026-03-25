import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Login } from './Login';
import { Home } from './Home';
import { Stacks } from './Stacks';
import { Queues } from './Queues';
import { PrivateRoute } from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/stacks" element={<Stacks />} />
            <Route path="/queues" element={<Queues />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;