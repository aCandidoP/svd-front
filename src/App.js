import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useAuth } from './contexts/AuthContext';
import AppRouter from './routes/Router';

function App() {
  // Token state to manage authentication
  const { login } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      // se storedToken igual a null então redirecionada para a rota de login
    }
    if (storedToken) {
      login(storedToken);
    }
  }, [login]);

  return (
    <>
      <Header />
      {/* <LoginForm setToken={setToken} /> */}
      <AppRouter />
    </>
  );
}

export default App;
