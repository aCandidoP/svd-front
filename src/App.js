import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import LoginForm from './components/Login';
import AppRouter from './routes/Router';

function App() {
  // Token state to manage authentication
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      // se storedToken igual a null então redirecionada para a rota de login
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Header token={token} />
      <LoginForm setToken={setToken} />
      {token}
      <AppRouter />
    </>
  );
}

export default App;
