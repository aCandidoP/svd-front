import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useAuth } from './contexts/AuthContext';
import AppRouter from './routes/Router';

function App() {
  // TODO: Criar componente para o load das páginas/componentes
  // Token state to manage authentication
  const { login } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      // se storedToken igual a null então redirecionada para a rota de login
      redirect('/login');
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
