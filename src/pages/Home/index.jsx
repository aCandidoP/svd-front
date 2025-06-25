import { useEffect, useState } from 'react';
import DashboardChamados from '../../components/DashboardChamados';
import { useAuth } from '../../contexts/AuthContext';
import { validTokenDecoded } from '../../helpers/decode';

function Home() {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const isTokenValid = token && token !== null && validTokenDecoded(token);
    const storedToken = localStorage.getItem('token');
    const isLoggedIn = storedToken && storedToken === token && isTokenValid;

    setHasLoggedIn(isLoggedIn);
  }, [token]);

  return (
    <div className="container">
      {hasLoggedIn ? (
        <DashboardChamados />
      ) : (
        <div className="text-center mt-5">
          <h1>Bem-vindo ao sistema de chamados</h1>
          <p>Por favor, faça login para acessar seus chamados.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
