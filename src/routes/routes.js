import DetalheChamados from '../pages/DetalheChamados';
import Home from '../pages/Home';
import ListarChamados from '../pages/ListarChamados';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import NovoChamado from '../pages/NovoChamado';

// Adicionar as rotas aqui
const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Home',
  },
  {
    path: '/novo-chamado',
    element: <NovoChamado />,
    name: 'Novo Chamado',
  },
  {
    path: '/consultar-chamados',
    element: <ListarChamados />,
    name: 'Consultar Chamados',
  },
  {
    path: '/detalhes-chamado/:id',
    element: <DetalheChamados />,
    name: 'Detalhes do Chamado',
  },
  {
    path: '/login',
    element: <Login />,
    name: 'Login',
  },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
  },
];

export default routes;
