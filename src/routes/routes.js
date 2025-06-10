import Home from '../pages/Home';
import Login from '../pages/Login';

// Adicionar as rotas aqui
const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Home',
  },
  {
    path: '/login',
    element: <Login />,
    name: 'Login',
  },
];

export default routes;
